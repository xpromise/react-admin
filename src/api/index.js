/*
  定义发送请求函数模块
 */
import jsonp from 'jsonp';
import ajax from "./ajax";

//提取公共代码，公共url地址
//webpack定义的环境变量
// console.log(process.env.NODE_ENV);  // development  production
const prefix = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000';

//请求登陆函数
export const reqLogin = (username, password) => ajax(prefix + '/login', {username, password}, 'POST');
//请求添加用户函数
export const reqAddUser = user => ajax(prefix + '/manage/user/add', user, 'POST');
//请求天气函数
export const reqWeather = city => {
  return new Promise((resolve, reject) => {
    jsonp(
      `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      (err, data) => {
        if (!err) {
          //请求成功
          resolve(data.results[0].weather_data[0])
        } else {
          //请求失败
          console.log('天气请求失败：', err);
          reject('天气请求失败~');
        }
      })
  })
}
//请求分类列表的函数
export const reqCategories = parentId => ajax(prefix + '/manage/category/list', {parentId});
//请求添加分类函数
export const reqAddCategory = (parentId, categoryName) => ajax(prefix + '/manage/category/add', {parentId, categoryName}, 'POST');
//请求更新分类名称的函数
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax(prefix + '/manage/category/update', {categoryId, categoryName}, 'POST');
//请求分页商品列表数据的函数
export const reqProductsList = (pageNum, pageSize) => ajax(prefix + '/manage/product/list', {pageNum, pageSize})
//请求搜索商品列表数据函数
export const reqSearchProductsList = ({pageNum, pageSize, searchType, searchName}) => ajax(prefix + '/manage/product/search', {pageNum, pageSize, [searchType]: searchName})
//请求删除图片的函数
export const reqDelImage = (name, id) => ajax(prefix + '/manage/img/delete', {name, id}, 'POST');
//请求更新商品状态的函数
export const reqUpdateStatus = (productId, status) => ajax(prefix + '/manage/product/updateStatus', {productId, status}, 'POST');
//请求更新商品的函数
export const reqUpdateProduct = product => ajax(prefix + '/manage/product/update', product, 'POST');
//请求角色列表的函数
export const reqRoleList = () => ajax(prefix + '/manage/role/list');
//请求创建角色的函数
export const reqAddRole = (name) => ajax(prefix + '/manage/role/add', {name}, 'POST');
//请求更新角色的函数
export const reqUpdateRole = (role) => ajax(prefix + '/manage/role/update', {role}, 'POST');
