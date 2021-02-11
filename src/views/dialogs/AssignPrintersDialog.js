import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import PrintersTable from '../Users/UsersTables';
import { UsersContext } from 'src/Contexts/UsersContext';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#fff',
    color: 'black'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignPrintersDialog = props => {
  const { open, toggleDialog, order } = props;
  const { usersObj } = useContext(UsersContext);
  const classes = useStyles();

  const [printers, setPrinters] = useState([]);

  const assignPrinter = obj => {
    console.log('obj', obj);
  };

  useEffect(() => {
    setPrinters(usersObj.printers);
  }, [usersObj.printers]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={toggleDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Assign Order to a Printer
            </Typography>
          </Toolbar>
        </AppBar>

        <PrintersTable
          users={printers}
          handleClick={assignPrinter}
          showPopUp={true}
          order={order}
        />
      </Dialog>
    </div>
  );
};

export default AssignPrintersDialog;
