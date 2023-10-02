import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import {AuthContextProvider} from './store/auth-context';

ReactDom.render(
  <AuthContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthContextProvider>,
  document.getElementById('root')
);
