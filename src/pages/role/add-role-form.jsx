import React, {Component} from 'react';
import {Form, Input} from 'antd';

const Item = Form.Item;

class AddRoleForm extends Component {
  
  componentWillMount () {
    const {setForm, form} = this.props;
    setForm(form);
  }
  
  render () {
    const {getFieldDecorator} = this.props.form;
    
    return (
      <Form>
        <Item label='角色名称' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'name'
            )(
              <Input placeholder='请输入角色名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddRoleForm)