/*
  封装发送ajax请求函数
  返回值是promise对象
  需求：
    1. 统一处理成功和失败
    2. 返回值是promise对象，里面直接就是请求回来的数据
 */
import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data = {}, method = 'GET') {
  let promise = null;
  if (method === 'GET') {
    promise = axios.get(url, {params: data});
  } else if (method === 'POST') {
    promise = axios.post(url, data);
  }
  
  return new Promise((resolve, reject) => {
    promise
      .then(res => {
        //将请求回来的数据返回
        resolve(res.data);
      })
      .catch(err => {
        //统一处理请求失败的逻辑
        console.log('请求失败err:', err);
        message.error('请求失败~~~');
      })
  })
  
  /*
  return promise
      .then(res => {
        //将请求回来的数据返回
        //then函数中return返回值如果是promise对象，就是promise对象
        //如果不是promise对象，将返回结果包装一个promise对象返回
        return res.data;
      })
      .catch(err => {
        //统一处理请求失败的逻辑
        console.log('请求失败err:', err);
        message.error('请求失败~~~');
      })
  */
}


