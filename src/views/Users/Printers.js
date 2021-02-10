import React, { useContext, useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

import { UsersContext } from 'src/Contexts/UsersContext';
import UsersTables from './UsersTables';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Printers = () => {
  const classes = useStyles();

  const { usersObj } = useContext(UsersContext);

  console.log('usersObj', usersObj);
  const [filteredPrinters, setFilteredPrinters] = useState([]);

  useEffect(() => {
    setFilteredPrinters(usersObj.printers);
  }, [usersObj.printers]);
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg"></Container>
      <UsersTables users={filteredPrinters} allowActions={['edit', 'delete']} />
    </Page>
  );
};

export default Printers;
