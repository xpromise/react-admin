/*
用来创建action对象的工厂函数
 */
import {SET_MENU_TITLE} from './action-types';
//同步action creators
export const setMenuTitle = title => ({type: SET_MENU_TITLE, data: title});