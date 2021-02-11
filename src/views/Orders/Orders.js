import React, { useContext, useState, useEffect } from 'react';
import { Container, makeStyles, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import { OrdersContext } from 'src/Contexts/OrdersContext';

// import OrderCard from './OrderCard';
import OrderCard from './Order_Card';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Orders = () => {
  const classes = useStyles();

  const { ordersObj, assignOrder } = useContext(OrdersContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOrders(ordersObj.allOrders);
    if (ordersObj.allOrders && ordersObj.allOrders.length > 0) {
      setLoading(false);
    }
  }, [ordersObj.allOrders]);

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        {loading ? (
          <div className="loader"></div>
        ) : (
          orders &&
          orders.length > 0 && (
            <Grid
              container
              style={{
                justifyContent: 'center',
                //  flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {orders.map((order, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
                  <OrderCard order={order} isAssignOrder={true} />
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Container>
    </Page>
  );
};

export default Orders;
