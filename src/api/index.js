/*
  定义发送请求函数模块
 */

import ajax from "./ajax";

//提取公共代码，公共url地址
//webpack定义的环境变量
// console.log(process.env.NODE_ENV);  // development  production
const prefix = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000';

//请求登陆函数
export const reqLogin = (username, password) => ajax(prefix + '/login', {username, password}, 'POST');
//请求添加用户函数
export const reqAddUser = user => ajax(prefix + '/manage/user/add', user, 'POST');