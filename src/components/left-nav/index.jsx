import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {NavLink, withRouter} from 'react-router-dom';

import menuList from '../../config/menuConfig';
import './index.less';
import logo from '../../assets/images/logo.png';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class LeftNav extends Component {
  
  //需要在渲染之前得到要菜单项
  componentWillMount () {
    this.menu = this.createMenu(menuList);
  }
  
  createMenu = (menu) => {
    
    return menu.map(item => {
      //判断是否有子菜单
      if (item.children) {
        //得到当前路径
        const {pathname} = this.props.location;
        //找是否有与children中匹配的pathname
        const result = item.children.find(item => item.key === pathname);
        if (result) {
          //children中有与pathname匹配路径，记录item.key
          this.openKey = item.key;
        }
        
        return <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>}>
          {
            this.createMenu(item.children)
            /*
            item.children.map(item => {
              return <Item key={item.key}>
                <NavLink to={item.key}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </NavLink>
              </Item>
            })
            */
          }
        </SubMenu>
      } else {
        //没有子菜单的返回值
        return <Item key={item.key}>
          <NavLink to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </NavLink>
        </Item>
      }
    
    })
  }
  
  render () {
    //获取当前路由路径
    const {pathname} = this.props.location;
    
    return (
      <div className='left-nav'>
        <header>
          <NavLink to='/home' className='left-nav-header'>
            <img src={logo} alt="logo"/>
            <h2>硅谷后台</h2>
          </NavLink>
        </header>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.openKey]}
        >
          {
            this.menu
          }
        </Menu>
      </div>
    )
  }
}

//withRouter: 是一个高阶组件， 作用：将普通组件变成路由组件(普通组件就多了三个属性)
export default withRouter(LeftNav);