import React, {Component} from 'react';
import {Row, Col, Modal} from 'antd';
import {withRouter} from 'react-router-dom';

import MemoryUtils from '../../utils/memoryUtils';
import {removeItem} from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import './index.less';

class Header extends Component {
  
  //退出登录方法
  logOut = () => {
    Modal.confirm({
      title: '您确认要退出登录吗?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        //点击确认时触发回调函数
        //清除用户信息（localStorage 内存）
        removeItem();
        MemoryUtils.user = {};
        //返回到登录页面
        this.props.history.replace('/login');
      },
    });
  }
  
  //获取标题方法
  getTitle = menu => {
    const {pathname} = this.props.location;
    
    for (let i = 0; i < menu.length; i++) {
      let item = menu[i];
      if (item.children) {
        /*for (let j = 0; j < item.children.length; j++) {
          let cItem = item.children[j];
          if (cItem.key === pathname) {
            return cItem.title;
          }
          
        }*/
        //递归去找是否有匹配的title，如果有才返回
        const title = this.getTitle(item.children);
        if (title) {
          return title;
        }
      } else {
        if (item.key === pathname) {
          return item.title;
        }
      }
    }
  }
  
  render () {
    //获取当前用户信息
    const {username} = MemoryUtils.user
    //获取标题
    const title = this.getTitle(menuList);
    
    return (
      <div className='header'>
        <Row className='header-top'>
          <span>欢迎, {username}</span>
          <a href="javascript:void(0);" onClick={this.logOut}>退出</a>
        </Row>
        <Row className='header-bottom'>
          <Col span={6} className='header-bottom-left'>{title}</Col>
          <Col span={18} className='header-bottom-right'>时间 + 天气</Col>
        </Row>
      </div>
    )
  }
}


export default withRouter(Header);