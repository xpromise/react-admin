import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Select, Input} from "antd";

const Item = Form.Item;
const Option = Select.Option;

class AddCategoryForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired
  }
  
  componentWillMount () {
    //一上来就将form对象传递给父组件使用
    this.props.setForm(this.props.form);
  }
  
  render () {
    const {getFieldDecorator} = this.props.form;
    const {categories} = this.props;
    
    return (
      <Form>
        <Item label='所属分类'>
          {
            getFieldDecorator(
              'parentId',
              {
                initialValue: '0'
              }
            )(
              <Select>
                <Option key='0' value="0">一级分类</Option>
                {
                  categories.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
        <Item label='分类名称'>
          {
            getFieldDecorator(
              'categoryName',
              {}
            )(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddCategoryForm)