import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Detail from './detail';
import Index from './index';
import SaveUpdate from './saveupdate';

export default class Product extends Component {
  render () {
    return (
      <Switch>
        <Route path='/product/index' component={Index}/>
        <Route path='/product/detail' component={Detail}/>
        <Route path='/product/saveupdate' component={SaveUpdate}/>
        <Redirect to='/product/index'/>
      </Switch>
    )
  }
}
