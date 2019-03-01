import React, {Component} from 'react';
import {
  Card,
  Button,
  Icon,
  Table,
  message,
  Modal,
} from 'antd';

import MyButton from '../../components/my-button';
import AddCategoryForm from '../../components/add-category-form';

import {reqCategories, reqAddCategory} from '../../api';



export default class Category extends Component {
  state = {
    categories: [],
    isShowAdd: false
  }
  
  //获取分类列表的方法
  getCategories = async parentId => {
    //发送请求
    const result = await reqCategories(parentId);
    if (result.status === 0) {
      //获取列表数据成功
      this.setState({
        categories: result.data
      })
    } else {
      message.error('获取分类列表数据失败~');
    }
  }
  
  //添加分类的函数
  addCategory = async () => {
    //获取当前填写表单数据
    const {parentId, categoryName} = this.form.getFieldsValue();
    //发送请求，后台添加分类
    const result = await reqAddCategory(parentId, categoryName);
    if (result.status === 0) {
      message.success('添加分类成功~');
      //更新数据
      this.setState({
        categories: [...this.state.categories, result.data],
        isShowAdd: false
      })
    } else {
      message.error('添加分类失败~');
      //隐藏对话框
      this.setState({
        isShowAdd: false
      })
    }
  }
  
  componentWillMount () {
    this.columns = [
      {
        title: '品类名称',  //表头名称
        dataIndex: 'name',
        // render: text => text,  //自定义渲染文本的规则
      }, {
        title: '操作',
        width: 300,
        render: xxx => {
          return <div>
            <MyButton  name='修改名称' /> &nbsp;&nbsp;&nbsp;
            <MyButton name='查看其子品类'/>
          </div>
        }
      }];
  }
  
  componentDidMount () {
    this.getCategories('0');
  }
  
  render () {
  
    const {categories, isShowAdd} = this.state;
    
    return (
      <Card
        title="一级分类列表"
        extra={<Button type='primary' onClick={() => this.setState({isShowAdd: true})}><Icon type="plus" />添加品类</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          pagination={{
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true
          }}
          rowKey='_id'
          loading={categories.length === 0}
        />
  
        <Modal
          title="添加分类"
          visible={isShowAdd}
          okText='确认'
          cancelText='取消'
          onOk={this.addCategory}
          onCancel={() => this.setState({isShowAdd: false})}
        >
          <AddCategoryForm categories={categories} setForm={form => this.form = form}/>
        </Modal>
      </Card>
    )
  }
}
