import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon} from 'antd';
import {NavLink, withRouter} from 'react-router-dom';

import {reqRoleList} from '../../api';
import menuList from '../../config/menuConfig';
import MemoryUtils from '../../utils/memoryUtils';

import './index.less';
import logo from '../../assets/images/logo.png';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class LeftNav extends Component {
  static propType = {
    setMenuTitle: PropTypes.func.isRequired
  }
  
  state = {
    menu: [],
    openKeys: []
  }
  
 /* //需要在渲染之前得到要菜单项
  componentWillMount () {
    this.menu = this.createMenu(menuList);
  }*/
  
  componentDidMount () {
    this.getRoleList();
  }
  
  getRoleList = async () => {
    const result = await reqRoleList();
    if (result.status === 0) {
      const {role_id, username} = MemoryUtils.user;
      let newMenu = menuList;
      
      if (username !== 'admin') {
        const {menus} = result.data.find(item => item._id === role_id);
        //对原菜单数据进行过滤
        newMenu = this.filterMenu(menuList, menus);
      }
      
      this.setState({
        menu: this.createMenu(newMenu)
      });
    }
  }
  
  filterMenu = (menuList, menus) => {
    let newMenu = [];
    for (var i = 0; i < menuList.length; i++) {
      const item = menuList[i];
      //判断一级菜单
      const result = menus.find(menu => item.key === menu);
      //result有值，说明当前遍历的item在menus里面
      if (result) {
        if (item.children) {
          //说明有二级菜单
          item.children = this.filterMenu(item.children, menus);
          newMenu.push(item);
        } else {
          //说明没有
          newMenu.push(item);
        }
      }
    }
    return newMenu;
  }
  
  createMenu = (menu) => {
    
    return menu.map(item => {
      //判断是否有子菜单
      if (item.children) {
        //得到当前路径
        const {pathname} = this.props.location;
        //找是否有与children中匹配的pathname
        const result = item.children.find(item => pathname.indexOf(item.key) === 0);
        if (result) {
          this.props.setMenuTitle(result.title);
          //children中有与pathname匹配路径，记录item.key
          this.setState({
            openKeys: [item.key]
          })
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
  
  handleOpenChange = (openKeys) => {
    // console.log(openKeys);
    this.setState({
      openKeys
    })
  }
  
  onSelect = ({key}) => {
    let title;
  
    if (key.indexOf('/product') === 0) {
      title = '商品管理';
    } else {
      for (let i = 0; i < menuList.length; i++) {
        let item = menuList[i];
        if (item.children) {
          for (let j = 0; j < item.children.length; j++) {
            let cItem = item.children[j];
            if (cItem.key === key) {
              title = cItem.title;
            }
          }
          //递归去找是否有匹配的title，如果有才返回
          /*const title = this.getTitle(item.children);
          if (title) {
            return title;
          }*/
        } else {
          if (item.key === key) {
            title = item.title;
          }
        }
      }
    }
    
    //处理title数据
    this.props.setMenuTitle(title);
  }
  
  render () {
    //获取当前路由路径
    let {pathname} = this.props.location;
    
    if (/^\/product/.test(pathname)) {
      pathname = '/product';
    }
    
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
          openKeys={this.state.openKeys}
          onOpenChange={this.handleOpenChange}
          onSelect={this.onSelect}
        >
          {
            this.state.menu
          }
        </Menu>
      </div>
    )
  }
}

//withRouter: 是一个高阶组件， 作用：将普通组件变成路由组件(普通组件就多了三个属性)
export default LeftNav;