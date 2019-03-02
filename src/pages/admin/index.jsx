import React, {Component} from 'react';
import {Layout} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom';

import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Home from '../home';
import Category from '../category';
import Product from '../product/product';
import User from '../user';
import Role from '../role';
import Pie from '../charts/pie';
import Line from '../charts/line';
import Bar from '../charts/bar';
import MemoryUtils from '../../utils/memoryUtils';

const {Sider, Content} = Layout;

export default class Admin extends Component {
  
  render () {
    //登陆验证（保证第一次渲染和重新渲染都要做登陆验证）
    const user = MemoryUtils.user;
    if (!user || !user._id) {
      //说明用户没有登陆过
      // this.props.history.replace('/login');  //编程式导航，只适用于事件的回调函数中
      return <Redirect to='/login'/>   //在render方法中返回值需要是一个React组件或者null
    }
    
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout >
          <Header />
          <Content style={{margin: 18}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/bar' component={Bar}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}
