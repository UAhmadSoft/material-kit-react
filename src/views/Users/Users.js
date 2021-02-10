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

const Users = () => {
  const classes = useStyles();
  const { usersObj } = useContext(UsersContext);

  console.log('usersObj', usersObj);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(usersObj.users);
  }, [usersObj.users]);

  console.log('filteredUsers', filteredUsers);
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg"></Container>
      <UsersTables users={filteredUsers} allowActions={['edit', 'delete']} />
    </Page>
  );
};

export default Users;
