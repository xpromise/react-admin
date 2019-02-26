import React, {Component} from 'react';

import LoginForm from '../../components/login-form';
import logo from './logo.png';
import './index.less';

export default class Login extends Component {
  render () {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='login-form'>
          <h2>用户登陆</h2>
          <LoginForm />
        </section>
      </div>
    )
  }
}




