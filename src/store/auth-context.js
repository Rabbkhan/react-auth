import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [logoutTimer, setLogoutTimer] = useState(null);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    // Set a timer to automatically log out after 5 minutes
    const timer = setTimeout(logoutHandler, 5 * 60 * 1000); // 5 minutes in milliseconds
    setLogoutTimer(timer);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    clearTimeout(logoutTimer); // Clear the timer
  };

  // Add a useEffect to reset the timer on user activity
  useEffect(() => {
    if (userIsLoggedIn) {
      const timer = setTimeout(logoutHandler, 1 * 60 * 1000); // Reset timer on activity
      setLogoutTimer(timer);
    }
  }, [userIsLoggedIn]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
