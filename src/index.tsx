import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import * as momentTimezone from 'moment-timezone';

import './assets/scss/_index.scss';
import './assets/images/index';
import './assets/antd/antd.css';

import MainRouter from './features/_router/main.router';

momentTimezone.locale('en');
momentTimezone.tz.setDefault('Europe/Zagreb');

ReactDOM.render(<MainRouter />, document.getElementById('root'));

serviceWorker.unregister();
