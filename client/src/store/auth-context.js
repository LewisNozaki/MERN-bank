import React, { useState, createContext } from "react";

const AuthContext = createContext({
  isAuth: false,
  isLoggedIn: false,
  userData: {},
  onCheck: () => {},
  onAuth: () => {},
  onLogin: () => {},
  onSignup: () => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const existingAuth = Boolean(localStorage.getItem("isAuth") || "");
  const existingLogin = Boolean(localStorage.getItem("isLoggedIn") || "");
  
  const [ isAuth, setIsAuth ] = useState(existingAuth);
  const [ isLoggedIn, setIsLoggedIn ] = useState(existingLogin);
  const [ userData, setUserData ] = useState({});
  
  const loginHandler = async (email, password) => {
    try {
      const result = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      })
      
      const data = await result.json();

      const parsedData = await data.user;

      setIsAuth(true);
      setIsLoggedIn(true);
      setUserData(prevState => ({
        ...prevState,
        ...parsedData
      }));
      localStorage.setItem("isLoggedIn", 1);
      localStorage.setItem("isAuth", 1);
    } catch (err) {
      console.log(err);
    }
  };

  const authHandler = () => {
    setIsAuth(true);
  };

  const signUpHandler = () => {
    setIsAuth(true);
    setIsLoggedIn(true);
  }

  const logoutHandler = async () => {
    try {
      const response = await fetch("/logout");

      const data = await response.json();

      console.log(data);

      setIsAuth(false);
      setIsLoggedIn(false);
      setUserData({});
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAuth");
    } catch (err) {
      console.log(err);
    }
  };
  
  const getUserInfo = async () => {
    try {
      const response = await fetch("/profile");
    
      const data = await response.json();
  
      if (data.isAuth) {
        setIsAuth(true);
        setIsLoggedIn(true);
        setUserData(prevState => ({
          ...prevState,
          data
        }))
      }
    } catch (err) {
      console.log(err);
    }

    return userData;
  }

  const authContextValue = {
    isAuth: isAuth,
    isLoggedIn: isLoggedIn,
    userData: userData,
    onCheck: getUserInfo,
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