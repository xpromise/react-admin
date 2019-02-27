import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {NavLink} from 'react-router-dom';

import './index.less';
import logo from '../../assets/images/logo.png';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

export default class LeftNav extends Component {
  render () {
    return (
      <div className='left-nav'>
        <header>
          <NavLink to='/home' className='left-nav-header'>
            <img src={logo} alt="logo"/>
            <h2>硅谷后台</h2>
          </NavLink>
        </header>
        <Menu mode="inline" theme="dark">
          <Item>
            <NavLink to='/home'>
              <Icon type="home" />
              <span>首页</span>
            </NavLink>
          </Item>
          <SubMenu title={<span><Icon type="home" />商品</span>}>
            <Item>
              <NavLink to='/category'>
                <Icon type="home" />
                <span>品类管理</span>
              </NavLink>
            </Item>
            <Item>
              <NavLink to='/product'>
                <Icon type="home" />
                <span>商品管理</span>
              </NavLink>
            </Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
