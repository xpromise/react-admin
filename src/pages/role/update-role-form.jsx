import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Tree} from 'antd';

import menuList from '../../config/menuConfig';

const Item = Form.Item;
const { TreeNode } = Tree;

class UpdateRoleForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    updateMenus: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    menus: PropTypes.array.isRequired
  }
  
  state = {
    // checkedKeys: [] //默认选中key
  }
  
  componentWillMount () {
    const {setForm, form} = this.props;
    setForm(form);
  }
  //点击选项框触发的回调函数
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.props.updateMenus(checkedKeys);
  }
  
  renderTreeNodes = menuList => menuList.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode title={item.title} key={item.key} />;
  })
  
  render () {
    const {menus, name} = this.props;
    const {getFieldDecorator} = this.props.form;
    
    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: name
              }
            )(
              <Input placeholder='请输入角色名称' disabled/>
            )
          }
        </Item>
        <Item>
          <Tree
            checkable
            onCheck={this.onCheck}
            checkedKeys={menus}
            defaultExpandAll={true}
          >
            <TreeNode title='平台权限' key={-1}>
              {this.renderTreeNodes(menuList)}
            </TreeNode>
          </Tree>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateRoleForm)