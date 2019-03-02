import React, {Component} from 'react';
import {Card, Input, Icon, Form, Cascader, InputNumber, Button } from 'antd';

const Item = Form.Item;
const InputGroup = Input.Group;

export default class SaveUpdate extends Component {
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
  
    const options = [
      {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    },
      {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }
    ];
    
    return (
      <Card
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon type='arrow-left' style={{fontSize: 25, marginRight: 10}}/>
            <span>添加商品</span>
          </div>
        }
      >
        <Form>
          <Item label='商品名称' {...formItemLayout}>
            <Input placeholder='请输入商品名称'/>
          </Item>
          <Item label='商品描述' {...formItemLayout}>
            <Input placeholder='请输入商品描述'/>
          </Item>
          <Item label='选择分类' {...formItemLayout}>
            <Cascader placeholder='请选择分类' options={options}/>
          </Item>
          <Item label='商品价格' {...formItemLayout}>
            <InputGroup>
              <InputNumber style={{position: 'relative', zIndex: 10}}/>
              <Input addonAfter={'元'} style={{width: 0, position: 'absolute', left: 65, top: 0.5}}/>
            </InputGroup>
          </Item>
          <Item label='商品图片' {...formItemLayout}>
            xxx
          </Item>
          <Item label='商品详情' {...formItemLayout}>
            xxx
          </Item>
          <Item>
            <Button type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
