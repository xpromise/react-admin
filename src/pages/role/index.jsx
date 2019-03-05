import React, {Component} from 'react';
import {Card, Button, Table, Radio, Modal, message} from 'antd';
import dayjs from 'dayjs';

import AddRoleForm from './add-role-form';
import UpdateRoleForm from './update-role-form';
import {reqRoleList, reqAddRole, reqUpdateRole} from '../../api';
import MemoryUtils from '../../utils/memoryUtils';

const RadioGroup = Radio.Group;

export default class Role extends Component {
  state = {
    value: '',  //单选的默认值，也就是选中的某个角色的id值
    roles: [], //权限数组
    isShowAddRoleModal: false, //是否展示创建角色的标识
    isShowUpdateRoleModal: false, //是否展示设置角色的标识
    isDisabled: true,  //控制设置角色权限按钮的标识
    role: {}    //当前选中
  }
  
  componentWillMount () {
    this.columns = [{
      dataIndex: '_id',
      render: id => <Radio value={id} />
    }, {
      title: '角色名称',
      dataIndex: 'name',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    }, {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: time => time && dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    }, {
      title: '授权人',
      dataIndex: 'auth_name',
    }];
  }
  
  componentDidMount () {
    this.getRoleList();
  }
  
  getRoleList = async () => {
    const result = await reqRoleList();
    
    if (result.status === 0) {
      message.success('获取角色列表数据成功~');
      this.setState({
        roles: result.data
      })
    } else {
      message.error('获取角色列表数据失败~');
    }
  
  }
  
  onRadioChange = (e) => {
    // console.log('radio checked', e.target.value);
    const role = this.state.roles.find(item => item._id === e.target.value);
    
    this.setState({
      value: e.target.value,
      isDisabled: false,
      role
    });
  }
  
  isShowModal = (name, flag) => {
    this.setState({[name]: flag})
  }
  
  //创建角色的回调函数
  handleAddRole = async () => {
    //收集表单数据
    const name = this.form.getFieldValue('name');
    //发送请求，更新后台数据
    const result = await reqAddRole(name);
    if (result.status === 0) {
      message.success('添加角色数据成功~');
      //更新前台数据, 隐藏对话框
      this.setState({
        roles: [...this.state.roles, result.data],
        isShowAddRoleModal: false
      })
    } else {
      message.error('添加角色数据失败~');
    }
  }
  //设置角色权限的回调函数
  handleUpdateRole = async () => {
    //得到最新role的数据
    const {role} = this.state;
    role.auth_name = MemoryUtils.user.username;
    role.auth_time = Date.now();
    
    const result = await reqUpdateRole(role);
    if (result.status === 0) {
      message.success('更新角色数据成功~');
      //更新前台数据, 隐藏对话框
      this.setState({
        roles: this.state.roles.map(item => {
          if (item._id === role._id) {
            return role;
          }
          return item;
        }),
        isShowUpdateRoleModal: false
      })
    } else {
      message.error('更新角色数据失败~');
    }
  }
  
  updateMenus = menus => {
    //更新
    this.setState({
      role: {...this.state.role, menus}
    })
  }
  
  render () {
    const {roles, role, value, isDisabled, isShowAddRoleModal, isShowUpdateRoleModal} = this.state;
    
    return (
      <Card
        title={
          <div>
            <Button type='primary' onClick={() => this.isShowModal('isShowAddRoleModal', true)}>创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' disabled={isDisabled} onClick={() => this.isShowModal('isShowUpdateRoleModal', true)}>设置角色权限</Button>
          </div>
        }
      >
        <RadioGroup onChange={this.onRadioChange} value={value} style={{width: '100%'}}>
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey='_id'
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '15', '20'],
              showQuickJumper: true,
            }}
          />
        </RadioGroup>
  
        <Modal
          title="创建角色"
          visible={isShowAddRoleModal}
          onOk={this.handleAddRole}
          onCancel={() => this.isShowModal('isShowAddRoleModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddRoleForm setForm={form => this.form = form}/>
        </Modal>
  
        <Modal
          title="设置角色权限"
          visible={isShowUpdateRoleModal}
          onOk={this.handleUpdateRole}
          onCancel={() => this.isShowModal('isShowUpdateRoleModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateRoleForm
            setForm={form => this.form = form}
            name={role.name}
            menus={role.menus}
            updateMenus={this.updateMenus}
          />
        </Modal>
        
      </Card>
    )
  }
}
