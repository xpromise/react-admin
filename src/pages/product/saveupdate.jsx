import React, {Component} from 'react';
import {Card, Input, Icon, Form, Cascader, InputNumber, Button } from 'antd';

import {reqCategories} from '../../api';

const Item = Form.Item;

class SaveUpdate extends Component {
  state = {
    options: []
  }
  
  componentWillMount () {
    //默认请求一级分类数据
    this.getCategories('0');
  }
  
  //负责请求分类数据，保存下来
  getCategories = async parentId => {
    const result = await reqCategories(parentId);
    if (result.status === 0) {
      if (parentId === '0') {
        //说明一级分类  - 不想重新渲染页面
        this.categories = result.data;
        
        this.initOptions();
      } else {
        this.subCategories = result.data;
      }
    }
  }
  //初始化分类组件需要的options
  initOptions = async () => {
    const {state} = this.props.location;
    //初始化一级分类的options
    let options = this.categories.map(item => ({value: item._id, label: item.name, isLeaf: false}));
  
    //判断是否有二级分类数据，如果有，接着去请求 （保证一级分类数据OK，只更新一次状态）
    if (state && state.product.pCategoryId !== '0') {
      await this.getCategories(state.product.pCategoryId);
      const {pCategoryId} = state.product;
      options.map(item => {
        if (item.value === pCategoryId) {
          item.children = this.subCategories.map(item => ({value: item._id, label: item.name}));
        }
        return item;
      })
    }
    //统一更新状态
    this.setState({
      options
    })
  }
  //用来加载二级分类数据的函数
  loadData = async (selectedOptions) => {
    // console.log(selectedOptions);
    //获取当前分类最后一项值
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    //发送请求，请求二级分类数据
    await this.getCategories(targetOption.value);
    //没有loading图
    targetOption.loading = false;
    if (this.subCategories.length) {
      targetOption.children = this.subCategories.map(item => ({value: item._id, label: item.name}));
    } else {
      targetOption.isLeaf = true;
    }
    //更新状态：重新渲染页面
    this.setState({
      options: [...this.state.options]
    })
  }
  
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    
    //获取传入的数据
    const {options} = this.state;
    const {form, location} = this.props;
    const {getFieldDecorator} = form;
    const {state} = location;
    const product = state ? state.product : false;
    
    //初始化分类
    let category = [];
    //判断初始化分类
    if (product) {
      if (product.pCategoryId === '0') {
        //一级分类
        category.push(product.categoryId);
      } else {
        //二级分类
        category = [product.pCategoryId, product.categoryId];
      }
    }
    
    return (
      <Card
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon onClick={() => this.props.history.goBack()} type='arrow-left' style={{fontSize: 25, marginRight: 10}}/>
            <span>{product ? '修改商品' : '添加商品'}</span>
          </div>
        }
      >
        <Form>
          <Item label='商品名称' {...formItemLayout}>
            {
              getFieldDecorator(
                'name',
                {
                  initialValue: product ? product.name : ''
                }
              )(
                <Input placeholder='请输入商品名称'/>
              )
            }
          </Item>
          <Item label='商品描述' {...formItemLayout}>
            {
              getFieldDecorator(
                'desc',
                {
                  initialValue: product ? product.desc : ''
                }
              )(
                <Input placeholder='请输入商品描述'/>
              )
            }
          </Item>
          <Item label='选择分类' labelCol={{span: 2}} wrapperCol={{span: 5}}>
            {
              getFieldDecorator(
                'category',
                {
                  initialValue: category
                }
              )(
                <Cascader
                  placeholder='请选择分类'
                  options={options}
                  loadData={this.loadData}
                />
              )
            }
          </Item>
          <Item label='商品价格' {...formItemLayout}>
            {
              getFieldDecorator(
                'price',
                {
                  initialValue: product ? product.price : ''
                }
              )(
                <InputNumber
                  style={{width: 150}}
                  formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\D+/g, '')}
                />
              )
            }
            
          </Item>
          <Item label='商品图片' {...formItemLayout}>
            xxx
          </Item>
          <Item label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 15}}>
            xxx
          </Item>
          <Item>
            <Button type='primary' style={{marginLeft: 20}} htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(SaveUpdate);
