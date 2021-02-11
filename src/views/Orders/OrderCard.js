import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import OrderDetails from './OrderDetail';
import AssignPrintersDialog from '../dialogs/AssignPrintersDialog';
import Axios from 'axios';
import { API_BASE_URL } from '../../utils/API_URLS';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 320,
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(10),
    // marginLeft: -20,
    margin: 'auto'
  },
  media: {
    height: 200
  }
}));

function Orders(props) {
  const {
    order,
    assignToPrinter,
    printers,
    isAssignOrder,
    getInvoice,
    editOrder,
    isEditOrder,
    loggedUser
  } = props;
  // console.clear();
  console.log('user order ', order);
  const classes = useStyles();

  const [detailsOpen, setdetailsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(undefined);
  const [showPrintersDialog, setShowPrintersDialog] = useState(false);

  useEffect(() => {
    if (orderStatus) {
      (async () => {
        try {
          const res = await Axios.put(`${API_BASE_URL}/orders/changeStatus`, {
            orderId: order._id,
            orderStatus: orderStatus,
            loggedUser
          });
        } catch (err) {
          alert('error changing order status');
        }
      })();
    }
  }, [orderStatus]);

  useEffect(() => {
    if (isEditOrder && isEditOrder === true) {
      setOrderStatus('assigned');
    }
  }, []);

  const openInvoice = () => {
    window.location.href = `/invoice/${order._id}`;
  };

  const togglePrintersDialog = () => {
    setShowPrintersDialog(!showPrintersDialog);
  };

  const toggleDetailsOpen = () => {
    setdetailsOpen(!detailsOpen);
  };

  const openOrder = () => {
    setCurrentOrder(order);
    toggleDetailsOpen();
  };

  const assignOrder = userId => {
    togglePrintersDialog();

    assignToPrinter(userId, order._id);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={order.orderItems[0] && order.orderItems[0].image}
            title="order"
          />
          <CardContent>
            <Typography variant="body2">
              Order By User : <br />{' '}
              {order && order.userId && order.userId.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={openOrder}
            size="small"
            // color='primary'
            style={{
              backgroundColor: '#373CA9',
              color: '#fff'
            }}
            variant="contained"
          >
            See Details
          </Button>

          {isEditOrder && isEditOrder === true && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Order Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orderStatus}
                // onChange={handleChange}
                onChange={e => setOrderStatus(e.target.value)}
              >
                <MenuItem value={'assigned'}>assigned </MenuItem>
                <MenuItem value={'under process'}>under process</MenuItem>
                <MenuItem value={'completed'}>completed</MenuItem>
                <MenuItem value={'delivered'}>delivered</MenuItem>
              </Select>
            </FormControl>
          )}

          {isAssignOrder && isAssignOrder === true && (
            <Button
              onClick={togglePrintersDialog}
              size="small"
              // color='primary'
              style={{
                backgroundColor: '#373CA9',
                color: '#fff'
              }}
              variant="contained"
            >
              Assign Order
            </Button>
          )}
          {getInvoice && getInvoice === true && (
            <Button
              onClick={openInvoice}
              size="small"
              // color='primary'
              style={{
                backgroundColor: '#373CA9',
                color: '#fff'
              }}
              variant="contained"
            >
              Get Invoice
            </Button>
          )}
        </CardActions>

        {detailsOpen && currentOrder && (
          <OrderDetails order={order} closeDetails={toggleDetailsOpen} />
        )}
      </Card>
      {/* {showPrintersDialog && ( */}
      <AssignPrintersDialog
        assignPrinter={assignOrder}
        toggleDialog={togglePrintersDialog}
        open={showPrintersDialog}
        printers={printers}
        order={order}
      />
      {/* } */}
    </>
  );
}
export default Orders;
