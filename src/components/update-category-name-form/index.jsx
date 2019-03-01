import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input} from "antd";

const Item = Form.Item;

class UpdateCategoryNameForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  
  componentWillMount () {
    //一上来就将form对象传递给父组件使用
    this.props.setForm(this.props.form);
  }
  
  render () {
    const {getFieldDecorator} = this.props.form;
    const {categoryName} = this.props;
    
    return (
      <Form>
        <Item>
          {
            getFieldDecorator(
              'categoryName',
              {
                initialValue: categoryName
              }
            )(
              <Input />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateCategoryNameForm)