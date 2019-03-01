import React from 'react';

import './index.less';

export default function MyButton(props) {
  return <button {...props} className='my-button'>{props.name}</button>
}
