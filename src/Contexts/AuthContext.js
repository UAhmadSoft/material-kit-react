import { initial } from 'lodash';
import React, { createContext, useState, useEffect } from 'react';
// import { withRouter } from 'react-router';

const AuthContext = createContext();

const AuthProvider = props => {
  let initialUser = null;

  try {
    initialUser = JSON.parse(window.localStorage.getItem('user'));
  } catch (err) {}

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (!user || user === null) return;
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
