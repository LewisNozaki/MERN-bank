import React, { useState, createContext } from "react";

const AuthContext = createContext({
  isAuth: false,
  isLoggedIn: false,
  onAuth: () => {},
  onLogin: () => {},
  onSignup: () => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [ isAuth, setIsAuth ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const loginHandler = () => {
    setIsAuth(true);
    setIsLoggedIn(true);
  };

  const authHandler = () => {
    setIsAuth(true);
  };

  const signUpHandler = () => {
    setIsAuth(true);
    setIsLoggedIn(true);
  }

  const logoutHandler = async () => {
    console.log("logging out...");
    try {
      const response = await fetch("/logout");

      const data = await response.json();

      console.log(data);

      setIsAuth(false);
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  const authContextValue = {
    isAuth: isAuth,
    isLoggedIn: isLoggedIn,
    onAuth: authHandler,
    onLogin: loginHandler,
    onSignup: signUpHandler,
    onLogout: logoutHandler
  };
  
  return (
    <AuthContext.Provider 
      value={authContextValue}
    >
      { children }
    </AuthContext.Provider>
  )
};

export default AuthContext;