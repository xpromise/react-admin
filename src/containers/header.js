import {connect} from 'react-redux';

import Header from '../components/header';

export default connect(
  state => ({menuTitle: state}),
  {}
)(Header);