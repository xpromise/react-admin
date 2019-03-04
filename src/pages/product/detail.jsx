import React, {Component} from 'react';
import {Card, Icon, List} from 'antd';

const Item = List.Item;

export default class Detail extends Component {
  
  renderItem = item => {
    if (typeof item === 'object') {
      if (!item.hasOwnProperty('length')) {
        const {pCategoryId, pName, name} = item;
        if (pCategoryId === '0') {
          return <Item>商品分类: {name}</Item>;
        } else {
          return <Item>商品分类: {pName}<Icon type='arrow-right'/>{name}</Item>;
        }
      } else {
        return <Item>商品图片: {item.map((item, index) => <img key={index} src={'http://localhost:5000/upload/' + item} alt={item}/>)}</Item>;
      }
    } else {
      if (item.indexOf('商品') === -1) {
        return <Item>商品详情: <div dangerouslySetInnerHTML={{__html: item}}></div></Item>
      }
      return <Item>{item}</Item>;
    }
  }
  
  render () {
    const {name, desc, price, pCategoryId, imgs, detail} = this.props.location.state.product;
    
    const category = {
      pCategoryId,
      pName: this.props.location.state.pName,
      name
    };
    
    const data = [
      '商品名称: ' + name,
      '商品描述: ' + desc,
      '商品价格: ' + price + '元',
      category,
      imgs,
      detail
    ];
    
    
    return (
      <Card
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon onClick={() => this.props.history.goBack()} type='arrow-left' style={{fontSize: 25, marginRight: 10}}/>
            <span>商品详情</span>
          </div>
        }
      >
        <List
          bordered
          size="large"
          dataSource={data}
          renderItem={this.renderItem}
        />
      </Card>
    )
  }
}
