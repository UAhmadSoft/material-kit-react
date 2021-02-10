import { initial } from 'lodash';
import React, { createContext, useState, useEffect } from 'react';
// import { withRouter } from 'react-router';
import axios from 'axios';
import { API_BASE_URL } from 'src/utils/API_URLS';

const UsersContext = createContext();

const UsersProvider = props => {
  const [usersObj, setUsersObj] = useState({
    users: [],
    printers: []
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setPrinters();
  }, [usersObj.users]);

  const updateAUser = async updatedUser => {
    const res = await axios.put(
      `${API_BASE_URL}/users/updateUser/${updatedUser._id}`,
      updatedUser
    );
    console.log('res', res);

    // * Update User from Users
    const newUsers = usersObj.users.map(user =>
      user._id === updatedUser._id
        ? {
            ...user,
            ...updatedUser
          }
        : user
    );
    setUsersObj({
      ...usersObj,
      users: newUsers
    });
  };

  const removeUser = async userId => {
    const res = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    console.log('res', res);

    // * Remove User from Users
    const newUsers = usersObj.users.filter(user => user._id !== userId);
    setUsersObj({
      ...usersObj,
      users: newUsers
    });
  };

  const setPrinters = () => {
    const printers = usersObj.users.filter(user => user.role === 'printer');

    setUsersObj({
      ...usersObj,
      printers
    });
  };
  const fetchUsers = () => {
    (async () => {
      const res = await axios.get(`${API_BASE_URL}/users`);
      console.log('res', res);
      setUsersObj({
        ...usersObj,
        users: res.data.users
      });
    })();
  };

  return (
    <UsersContext.Provider
      value={{ usersObj, setUsersObj, updateAUser, removeUser }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export { UsersProvider, UsersContext };
