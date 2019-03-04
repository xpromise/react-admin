import React, {Component} from 'react';
import {Card, Button, Icon, Table, Select, Input, message} from 'antd';

import MyButton from '../../components/my-button';
import {reqProductsList, reqSearchProductsList, reqCategories, reqUpdateStatus} from '../../api';

const Option = Select.Option;

export default class Index extends Component {
  state = {
    products: [],
    total: 0,
    searchType: 'productName',
    searchName: ''
  }
  
  componentWillMount () {
    this.columns = [
      {
        title: '商品名称',  //表头名称
        dataIndex: 'name',
        // render: text => text,  //自定义渲染文本的规则
      }, {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: 200,
        render: text => '¥'+ text
      },
      {
        title: '状态',
        width: 200,
        render: product => {
          //商品状态: 1:在售, 2: 下架了
          const {_id, status} = product;
          console.log(_id, status);
          
          if (status === 1) {
            return <div>
              <Button type='primary' onClick={() => this.updateStatus(_id, status)}>上架</Button>&nbsp;&nbsp;
              已下架
            </div>
          } else {
            return <div>
              <Button type='primary' onClick={() => this.updateStatus(_id, status)}>下架</Button>&nbsp;&nbsp;
              在售
            </div>
          }
        }
      },
      {
        title: '操作',
        width: 200,
        render: product => {
          //得到整个数据，就不能传入dataIndex
          // console.log(product);
          return <div>
            <MyButton name='详情' onClick={async () => {
              let state = {product};
              if (product.pCategoryId !== '0') {
                const {data} = await reqCategories('0');
                const {name} = data.find(item => item._id === product.pCategoryId);
                state.pName = name;
              }
              this.props.history.push('/product/detail', state);
            }}/> &nbsp;&nbsp;
            <MyButton name='修改' onClick={() => this.props.history.push('/product/saveupdate', {product})}/>
          </div>
        }
      }
      ];
  }
  
  updateStatus = async (productId, status) => {
    //改变状态值~
    status = status === 1 ? 2 : 1;
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success('更新状态成功~');
      this.setState({
        products: this.state.products.map(item => {
          if (item._id === productId) {
            item.status = status;
          }
          return item;
        })
      })
    } else {
      message.error('更新状态失败~');
    }
  }
  
  //获取商品列表的方法
  getProducts = async (pageNum, pageSize) => {
  
    //获取表单项的值
    const {searchName, searchType} = this.state;
    let result;
    
    if (searchName) {
      result = await reqSearchProductsList({searchName, searchType, pageNum, pageSize});
    } else {
      result = await reqProductsList(pageNum, pageSize);
    }
    
    if (result.status === 0) {
      this.setState({
        products: result.data.list,
        total: result.data.total
      })
    } else {
      message.error('获取分页商品数据失败');
    }
  }
  
  componentDidMount () {
    this.getProducts(1, 3);
  }
  
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  
  render () {
    const {products, total} = this.state;
    
    return (
      <Card
        title={
          <div>
            <Select defaultValue='productName' onChange={value => this.handleChange('searchType', value)}>
              <Option value='productName'>根据商品名称</Option>
              <Option value='productDesc'>根据商品描述</Option>
            </Select>
            <Input placeholder='关键字' style={{width: 200, marginLeft: 10, marginRight: 10}} onChange={e => this.handleChange('searchName', e.target.value)}/>
            <Button type='primary' onClick={() => this.getProducts(1, 3)}>搜索</Button>
          </div>
        }
        extra={<Button type='primary' onClick={() => this.props.history.push('/product/saveupdate')}><Icon type='plus'/>添加产品</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          pagination={{
            defaultPageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true,
            total,
            onChange: this.getProducts,
            onShowSizeChange: this.getProducts
          }}
          rowKey='_id'
          loading={products.length === 0}
        />
      </Card>
    )
  }
}
