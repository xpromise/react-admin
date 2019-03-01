import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd';

//注意不要放在import上面
const Item = Form.Item;

class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }
  
  //自定校验规则
  checkPassword = (rule, value, callback) => {
    // console.log(rule, value);
    
    if (!value) {
      callback('必须输入密码');
    } else if (value.length < 4) {
      callback('密码长度必须超过4位');
    } else if (value.length > 11) {
      callback('密码长度必须小于11位');
    } else if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
      //代表校验不通过
      callback('密码只能包含大小写英文、数字或者下划线')
    } else {
      //代表校验通过
      callback();
    }
    
  }
  
  handleSubmit = e => {
          e.preventDefault();
          const {validateFields, resetFields} = this.props.form;
    
          //检查当前表单项是否通过校验
          validateFields(async (error, values) => {
            console.log(error, values);
            if (!error) {
              //校验通过
              console.log('收集的表单数据：', values);
              const {username, password} = values;
              //调用父组件的login方法，由父组件发送请求去登陆
              this.props.login(username, password);
        
      } else {
        //校验失败
        //重置密码
        resetFields(['password']);
        //收集错误信息
        /*
          Object.values(obj) 将对象中每一个值，添加到一个数组中并返回数组
          arr.reduce()  统计错误信息
        */
       const errMsg = Object.values(error).reduce((prev, curr) => prev + curr.errors[0].message + ' ', '')
        //提示错误
        message.error(errMsg);
      }
      
    })
    
  }
  
  render () {
    const {getFieldDecorator} = this.props.form;
  
    return (
      <Form className='login-form-container' onSubmit={this.handleSubmit}>
        <Item>
          {
            /*
              配置对象：属性名固定的一个对象
              getFieldDecorator(输入框的标识名称, 配置对象)
              getFieldDecorator()返回值是一个函数X，getFieldDecorator是一个高阶函数
              getFieldDecorator()(组件)返回值是一个新组件，函数X是一个高阶组件
             */
            getFieldDecorator(
              'username',
              {
                rules: [
                  { required: true, message: '请输入用户名！' },
                  { min: 4, message: '用户名必须大于等于4位' },
                  { max: 11, message: '用户名不能超过11位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是大小写英文、数字或者下划线' }
                ],
              }
            )(<Input placeholder='用户名' prefix={<Icon type="user" />}/>)
          }
        </Item>
        <Item>
          {
            getFieldDecorator(
              'password',
              {
                rules: [
                  {validator: this.checkPassword}
                ]
              }
            )(<Input placeholder='密码' type='password' prefix={<Icon type="safety" />}/>)
          }
        </Item>
        <Item>
          <Button type='primary' htmlType="submit" className='login-form-button'>登录</Button>
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