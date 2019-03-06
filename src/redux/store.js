/*
  管理redux状态数据的
 */
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);