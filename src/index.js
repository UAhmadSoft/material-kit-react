import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './Contexts/AuthContext';
import { UsersProvider } from './Contexts/UsersContext';
import { OrdersProvider } from './Contexts/OrdersContext';

ReactDOM.render(
  <AuthProvider>
    <UsersProvider>
      <OrdersProvider>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </OrdersProvider>
    </UsersProvider>
  </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
