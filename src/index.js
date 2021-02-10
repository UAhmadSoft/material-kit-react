import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './Contexts/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
