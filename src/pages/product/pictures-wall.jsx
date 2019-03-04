import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal, message } from 'antd';

import {reqDelImage} from '../../api';

export default class PicturesWall extends Component {
  static propTypes = {
    productId: PropTypes.string.isRequired,
    imgs: PropTypes.array,
  }
  
  state = {
    previewVisible: false,  //决定对话框是否显示
    previewImage: '',  //对话框显示图片地址
    fileList: [],  //上传组件显示已经上传好的图片列表
  };
  
  componentWillMount () {
    /*
      {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
     */
    const fileList = this.props.imgs.map((item, index) => {
      return {
        uid: -index,
        name: item,
        status: 'done', // done 加载完成的图片  loading 正在加载  error 加载失败  "removed" 删除图片
        url: 'http://localhost:5000/upload/' + item
      }
    })
    this.setState({fileList})
  }
  
  // 隐藏对话框
  handleCancel = () => this.setState({ previewVisible: false })
  // 显示预览图调用函数
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  // 上传/删除图片调用的回调函数
  handleChange = ({ file, fileList }) => {
    //判断是否上传成攻
    if (file.status === 'done') {
      //更新fileList最后一个file的url和name
      let file = fileList[fileList.length - 1];
      file.name = file.response.data.name;
      file.url = file.response.data.url;
    } else if (file.status === 'removed') {
      //删除图片
      Modal.confirm({
        title: '您确认要删除图片吗?',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const result = await reqDelImage(file.name, this.props.productId);
          if (result.status === 0) {
            message.success('删除图片成功');
          } else {
            message.error('删除图片失败');
          }
          this.setState({ fileList })
        },
        onCancel() {
        },
      });
      return
    }
  
    this.setState({ fileList })
  }
  
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"  //上传图片的服务器地址
          listType="picture-card"
          fileList={fileList}     //显示图片文件列表
          onPreview={this.handlePreview}  //点击预览调用回调函数
          onChange={this.handleChange}   //上传/删除调用的回调函数
          name='image'
          data={{id: this.props.productId}}
          accept='image/*'
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}