import React, {Component} from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';

//注意不要放在import上面
const Item = Form.Item;

class LoginForm extends Component {
  render () {
    const {form} = this.props;
    console.log(form);
    
    return (
      <Form className='login-form-container'>
        <Item>
          <Input placeholder='用户名' prefix={<Icon type="user" />}/>
        </Item>
        <Item>
          <Input placeholder='密码' prefix={<Icon type="safety" />}/>
        </Item>
        <Item>
          <Button type='primary' className='login-form-button'>登录</Button>
        </Item>
      </Form>
    )
  }
}

/*
  包裹了LoginForm组件，生成一个新组件Form(LoginForm)
  作用：产生新组件，由新组件向LoginForm组件传递form属性
  语法：
    Form.create()返回值是一个函数X，Form.create这个函数叫做高阶函数（高阶函数：返回值是函数或者参数是函数）
    Form.create()(LoginForm)返回值是一个组件，函数X叫做高阶组件（高阶组件本质上是一个函数，接受的参数是组件，返回值是一个新组件）
 */
const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;