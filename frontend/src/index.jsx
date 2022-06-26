import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './bootstrap.css'
import './index.css';
import { Provider } from 'react-redux';
import store from './store'

import setupAxios from './utils/setupAxios'
setupAxios(store);

ReactDOM.render(<Provider store={store} > <App /> </Provider> , document.getElementById('root'));