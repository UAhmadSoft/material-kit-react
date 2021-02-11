import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

import OrderDetails from './OrderDetail';
import AssignPrintersDialog from '../dialogs/AssignPrintersDialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const OrderCard = ({
  className,
  product,
  order,
  assignToPrinter,
  printers,
  isAssignOrder,
  getInvoice,
  editOrder,
  isEditOrder,
  loggedUser,
  ...rest
}) => {
  const classes = useStyles();

  const [detailsOpen, setdetailsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(undefined);
  const [showPrintersDialog, setShowPrintersDialog] = useState(false);

  const togglePrintersDialog = () => {
    setShowPrintersDialog(!showPrintersDialog);
  };

  const assignOrder = userId => {
    togglePrintersDialog();

    assignToPrinter(userId, order._id);
  };

  const toggleDetailsOpen = () => {
    setdetailsOpen(!detailsOpen);
  };

  const openOrder = () => {
    setCurrentOrder(order);
    toggleDetailsOpen();
  };

  return (
    <>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar
              alt="Product"
              src={order.orderItems[0].image}
              variant="square"
              style={{
                width: '100%',
                height: 200
              }}
            />
          </Box>
          {/* <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {product.title}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {product.description}
          </Typography> */}
        </CardContent>
        <Box flexGrow={1} />
        <Divider />
        <Box p={2}>
          <Grid container justify="space-between" spacing={2}>
            <Grid className={classes.statsItem} item>
              {/* <Typography color="textSecondary" display="inline" variant="body2">
                See Details
              </Typography>
              <AccessTimeIcon className={classes.statsIcon} color="action" /> */}
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
                See Details
              </Button>
            </Grid>
            <Grid className={classes.statsItem} item>
              {/* <Typography color="textSecondary" display="inline" variant="body2">
                Assign Order
              </Typography>
              <GetAppIcon className={classes.statsIcon} color="action" /> */}
              {isAssignOrder && (
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
            </Grid>
          </Grid>
        </Box>
      </Card>
      {detailsOpen && currentOrder && (
        <OrderDetails order={order} closeDetails={toggleDetailsOpen} />
      )}
      <AssignPrintersDialog
        assignPrinter={assignOrder}
        toggleDialog={togglePrintersDialog}
        open={showPrintersDialog}
        printers={printers}
        order={order}
      />
    </>
  );
};

export default OrderCard;
