import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Select } from 'antd';

const Item = Form.Item;
const Option = Select.Option;

class AddUserForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
  }
  
  componentWillMount () {
    const {setForm, form} = this.props;
    setForm(form);
  }
  
  render () {
    const {roles} = this.props;
    const {getFieldDecorator} = this.props.form;
    
    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'username',
              {
                rules: [
                  {required: true, message: '必须输入用户名'},
                  {min: 3, message: '用户名至少要超过3位'}
                ]
              }
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'password'
            )(
              <Input placeholder='请输入密码' type='password'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone'
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email'
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role_id'
            )(
              <Select placeholder='请选择分类'>
                {
                  roles.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUserForm)