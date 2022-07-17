import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

function calculateTime(expirationTime) {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();

  return adjustedExpirationTime - currentTime;
}

function retrieveToken() {
  const token = localStorage.getItem("token");
  const storedExpiration = localStorage.getItem("expiration");

  const remainingTime = calculateTime(storedExpiration);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    return null;
  }

  return { token: token, duration: remainingTime };
}
let logoutTimer;

export function AuthContextProvider(props) {
  const tokenData = retrieveToken();
  let intialToken;
  if (tokenData) {
    intialToken = tokenData.token;
  }
  const [token, setToken] = useState(intialToken);
  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  function loginHandler(token, expirationTime) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationTime);
    setToken(token);
    const remainingTime = calculateTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  }

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token,
    isLoggedIn,
    loginHandler,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
