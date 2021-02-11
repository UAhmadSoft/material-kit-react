import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import OrderItem from './OrderDetailItem';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#fff'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrderDetails = props => {
  const classes = useStyles();

  const { closeDetails, order, open } = props;
  //    const [open, setOpen] = React.useState(false);

  const currentUser = order.userId;
  //    const handleClickOpen = () => {
  //       setOpen(true);
  //    };

  //    const handleClose = () => {
  //       setOpen(false);
  //    };

  return (
    <div>
      <Dialog
        fullScreen
        open={open || true}
        onClose={closeDetails}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar style={{ color: 'black', backgroundColor: '#fff' }}>
            <IconButton
              edge="start"
              // color='inherit'

              onClick={closeDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Order User{' '}
              <span style={{ textTransform: 'capitalize' }}>
                {currentUser.name}
              </span>
            </Typography>
            {/* <Button
                     autoFocus
                     color='inherit'
                     onClick={closeDetails}
                  >
                     save
                  </Button> */}
          </Toolbar>
        </AppBar>
        <Grid
          container
          style={{
            textAlign: 'left',
            marginTop: '40px'
          }}
        >
          {order.orderItems.length === 0 ? (
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{
                padding: 20
              }}
            ></Grid>
          ) : (
            <>
              <Grid
                item
                lg={4}
                md={5}
                sm={4}
                xs={12}
                style={{
                  paddingLeft: 20
                }}
              >
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{
                    marginBottom: 30
                  }}
                >
                  <span style={{ textTransform: 'capitalize' }}>
                    User's Details
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{
                    fontFamily: 'calibri',
                    fontWeight: 'bold',
                    padding: 10,
                    textAlign: 'left'
                  }}
                >
                  Name
                  <span
                    style={{
                      // fontSize: '0.5em',
                      fontWeight: 'normal',
                      fontSize: '0.9em',
                      paddingLeft: '20px'
                    }}
                  >
                    {currentUser.name}
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  component="h2"
                  variant="h6"
                  style={{
                    fontFamily: 'calibri',
                    fontWeight: 'bold',
                    padding: 10,
                    textAlign: 'left'
                  }}
                >
                  Email
                  <span
                    style={{
                      // fontSize: '0.5em',
                      fontWeight: 'normal',
                      fontSize: '0.9em',
                      paddingLeft: '20px'
                    }}
                  >
                    {currentUser.email}
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  component="h2"
                  variant="h6"
                  style={{
                    fontFamily: 'calibri',
                    fontWeight: 'bold',
                    padding: 10,
                    textAlign: 'left'
                  }}
                >
                  Role
                  <span
                    style={{
                      // fontSize: '0.5em',
                      fontWeight: 'normal',
                      fontSize: '0.9em',
                      paddingLeft: '20px'
                    }}
                  >
                    {currentUser.role}
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  component="h2"
                  variant="h6"
                  style={{
                    fontFamily: 'calibri',
                    fontWeight: 'bold',
                    padding: 10,
                    textAlign: 'left'
                  }}
                >
                  Zip Code
                  <span
                    style={{
                      // fontSize: '0.5em',
                      fontWeight: 'normal',
                      fontSize: '0.9em',
                      paddingLeft: '20px'
                    }}
                  >
                    {currentUser.zipCode}
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  component="h2"
                  variant="h6"
                  style={{
                    fontFamily: 'calibri',
                    fontWeight: 'bold',
                    padding: 10,
                    textAlign: 'left'
                  }}
                >
                  Shipping Address
                  <br />
                  <span
                    style={{
                      // fontSize: '0.5em',
                      fontWeight: 'normal',
                      fontSize: '0.9em',
                      paddingLeft: '20px'
                    }}
                  >
                    {currentUser.shippingAddress}
                  </span>
                </Typography>
              </Grid>

              <Grid item lg={8} md={7} sm={8} xs={12}>
                <Grid container spacing={5}>
                  {order.orderItems.map((orderItem, idx) => (
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <OrderItem
                        orderItem={orderItem}
                        key={idx}
                        id={idx}
                        isEditable={true}
                        isDeletable={true}
                        editOrderItem={() =>
                          console.log('editing order Item', orderItem)
                        }
                        deleteOrderItem={() =>
                          console.log('deleting order Item', orderItem)
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Dialog>
    </div>
  );
};

export default OrderDetails;
