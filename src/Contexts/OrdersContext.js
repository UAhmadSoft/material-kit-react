import React, { createContext, useState, useEffect } from 'react';
// import { withRouter } from 'react-router';
import axios from 'axios';
import { API_BASE_URL } from 'src/utils/API_URLS';

const OrdersContext = createContext();

const OrdersProvider = props => {
  const [ordersObj, setOrdersObj] = useState({
    allOrders: [],
    userOrders: []
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const assignOrder = () => {};

  const fetchOrders = () => {
    (async () => {
      const res = await axios.get(`${API_BASE_URL}/orders/getAllOrders`);
      console.log('res', res);
      setOrdersObj({
        ...ordersObj,
        allOrders: res.data.orders
      });
    })();
  };

  return (
    <OrdersContext.Provider value={{ ordersObj, assignOrder }}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export { OrdersProvider, OrdersContext };
