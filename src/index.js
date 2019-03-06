import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import {getItem} from "./utils/storageUtils";
import MemoryUtils from "./utils/memoryUtils";
import store from './redux/store';

//将localStorage的值读取出来，保存在内存中
const user = getItem();
if (user && user._id) {
  MemoryUtils.user = user;
}

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));