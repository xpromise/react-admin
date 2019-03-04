import React, {Component} from 'react';
import {Card, Button, Icon, Table, Select, Input, message} from 'antd';

import MyButton from '../../components/my-button';
import {reqProductsList, reqSearchProductsList} from '../../api';

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
        render: category => {
          return <div>
            <Button type='primary'>上架</Button>&nbsp;&nbsp;
            已下架
          </div>
        }
      },
      {
        title: '操作',
        width: 200,
        render: product => {
      
          return <div>
            <MyButton name='详情' onClick={() => {}}/> &nbsp;&nbsp;
            <MyButton name='修改' onClick={() => this.props.history.push('/product/saveupdate', {product})}/>
          </div>
        }
      }
      ];
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
