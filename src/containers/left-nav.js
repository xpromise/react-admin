import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import LeftNav from '../components/left-nav';
import {setMenuTitle} from '../redux/actions';

export default withRouter(connect(
  () => ({}),  //必须返回一个对象
  {setMenuTitle}
)(LeftNav))