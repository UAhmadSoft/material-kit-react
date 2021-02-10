import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  makeStyles,
  Button,
  Typography,
  Grid,
  TextField
} from '@material-ui/core';
import Page from 'src/components/Page';
import style from './Styles';
import { toast } from 'react-toastify';

import { API_BASE_URL } from './utils/API_URLS';
import ConfirmChangePriceDialog from './ConfirmDialogBox';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Price = () => {
  const classes = useStyles();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [FixPrice, setFixPrice] = useState(0);
  const [FixPriceTxt, setFixPriceTxt] = useState('');

  const toggleConfirmDialog = () => {
    setShowConfirmDialog(!showConfirmDialog);
  };

  const changeFixPriceDB = async e => {
    e.preventDefault();
    toggleConfirmDialog();
    try {
      const res = await axios.put(`${API_BASE_URL}/prices/fixedPrice`, {
        price: FixPriceTxt
      });

      console.clear();
      console.log('res', res.data);
      const newPrice = res.data.data.price;

      setFixPrice(newPrice);

      console.log('FixPrice', FixPrice);
      setFixPriceTxt('');
      toast.success(`Price Successfully Changed to ${newPrice} !`, {
        position: 'top-right',
        //  autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (err) {
      console.log('err', err);
      toast.error(`ERROR Changing Price!`, {
        position: 'top-right',
        //  autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/prices/fixedPrice`);

        // console.clear();
        // console.log('res', res.data.data.price);

        setFixPrice(res.data.data.price);
        setFixPriceTxt(res.data.data.price);
      } catch (err) {
        console.log('err', err);
      }
    })();
  }, []);

  const handleFixPriceTxt = e => {
    setFixPriceTxt(e.target.value);
  };
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Grid
          container
          style={{
            justifyContent: 'center',
            //  flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <form onSubmit={toggleConfirmDialog}>
            <Grid
              container
              spacing={2}
              style={{
                alignItems: 'center'
              }}
            >
              <Grid
                item
                sm={12}
                md={4}
                lg={4}
                xs={12}
                style={{ textAlign: 'center' }}
              >
                <TextField
                  id="outlined-read-only-input"
                  label="Current Price"
                  value={FixPrice}
                  disabled
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                sm={12}
                md={4}
                xs={12}
                lg={4}
                style={{ textAlign: 'center' }}
              >
                <TextField
                  id="outlined-helperText"
                  label="Set Price"
                  defaultValue={FixPrice}
                  // helperText='Some important text'
                  variant="outlined"
                  value={FixPriceTxt}
                  onChange={handleFixPriceTxt}
                />
              </Grid>
              <Grid
                item
                sm={12}
                md={4}
                xs={12}
                lg={4}
                style={{ textAlign: 'center' }}
              >
                <Button
                  variant="contained"
                  // color='primary'
                  style={{
                    backgroundColor: '#373CA9',
                    color: '#fff'
                  }}
                  onClick={toggleConfirmDialog}
                  // href='#contained-buttons'
                >
                  Set Price
                </Button>
              </Grid>
            </Grid>
            {/* <></> */}
          </form>
        </Grid>
      </Container>
      <ConfirmChangePriceDialog
        open={showConfirmDialog}
        success={changeFixPriceDB}
        toggleDialog={toggleConfirmDialog}
        dialogTitle="Are you sure you want to Change Price ?"
      />
    </Page>
  );
};

export default Price;
