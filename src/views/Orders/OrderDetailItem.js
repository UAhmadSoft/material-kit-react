import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 'auto'
  },
  media: {
    height: 190,
    objectFit: 'contain'
  }
});

const OrderItem = props => {
  const classes = useStyles();

  const { orderItem, editOrderItem, deleteOrderItem, isEditItem } = props;

  return (
    <Card className={classes.root}>
      {/* <CardHeader
            style={{
               backgroundColor: 'dodgerblue',
            }}
            // avatar={
            //    <Avatar aria-label='recipe' className={classes.avatar}>
            //       R
            //    </Avatar>
            // }
            action={
               <>
                  <IconButton onClick={editOrderItem}>
                     <MoreVertIcon />
                  </IconButton>
                  <IconButton onClick={deleteOrderItem}>
                     <DeleteIcon />
                  </IconButton>
               </>
            }
            title='Order item'
            // subheader='September 14, 2016'
         /> */}
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            orderItem.image && orderItem.image.length > 1
              ? orderItem.image
              : 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801__340.jpg'
          }
          // image={
          //    (orderItem.image && orderItem.image.length) > 1
          //       ? orderItem.image
          //       : 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801__340.jpg'
          // }
          title={orderItem.id}
        />
        <CardContent
          style={{
            textAlign: 'left'
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            style={{
              fontFamily: 'calibri',
              fontWeight: 'bold'
            }}
          >
            Length
            <span
              style={{
                // fontSize: '0.5em',
                fontWeight: 'normal',
                fontSize: '0.9em',
                paddingLeft: '20px'
              }}
            >
              {orderItem.length}
            </span>
          </Typography>

          <Typography
            gutterBottom
            component="h2"
            variant="h6"
            style={{
              fontFamily: 'calibri',
              fontWeight: 'bold'
            }}
          >
            Width
            <span
              style={{
                // fontSize: '0.5em',
                fontWeight: 'normal',
                fontSize: '0.9em',
                paddingLeft: '20px'
              }}
            >
              {orderItem.width}
            </span>
          </Typography>

          {/* <Typography variant='h3'>
                  Width : <br /> {orderItem.width}
               </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography
          gutterBottom
          component="h2"
          variant="h5"
          style={{
            fontFamily: 'calibri',
            fontWeight: 'bold'
          }}
        >
          Price
          <span
            style={{
              // fontSize: '0.5em',
              fontWeight: 'normal',
              fontSize: '0.9em',
              padding: '0px 10px',
              marginLeft: '10px',
              background: 'yellow'
            }}
          >
            {orderItem.price}
          </span>
        </Typography>
        {isEditItem && isEditItem === true && (
          <>
            <IconButton
              onClick={editOrderItem}
              style={{
                marginLeft: 'auto'
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteOrderItem}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default OrderItem;
