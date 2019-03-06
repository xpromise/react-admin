/*
根据preState和action生成newState
 */
import {SET_MENU_TITLE} from './action-types';

function menuTitle(preState = '', action) {
  switch (action.type) {
    case SET_MENU_TITLE :
      return action.data;
    default :
      return preState;
  }
}

export default menuTitle;