import React, { useState, createContext } from "react";

const AuthContext = createContext({
  isAuth: false,
  isLoggedIn: false,
  userData: {},
  setUserInfo: () => {},
  onCreateAcct: () => {},
  onCheck: () => {},
  onAuth: () => {},
  onLogin: () => {},
  onSignup: () => {},
  onLogout: () => {},
  onGlLogin: () => {},
  onGLSignup: () => {}
});

export const AuthProvider = ({ children }) => {
  const existingAuth = Boolean(localStorage.getItem("isAuth") || "");
  const existingLogin = Boolean(localStorage.getItem("isLoggedIn") || "");
  
  // State
  const [ isAuth, setIsAuth ] = useState(existingAuth);
  const [ isLoggedIn, setIsLoggedIn ] = useState(existingLogin);
  const [ userData, setUserData ] = useState({});
  
  // Login Handler
  const loginHandler = async (email, password) => {
    try {
      const result = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      })
      
      const data = await result.json();
      
      setIsAuth(true);
      setIsLoggedIn(true);
      setUserData(prevState => ({
        ...prevState,
        ...data
      }));
      localStorage.setItem("isLoggedIn", 1);
      localStorage.setItem("isAuth", 1);
      localStorage.setItem("userID", data["_id"]);
    } catch (err) {
      console.log(err);
    }
  };
  
  // Set is auth handler
  const authHandler = () => {
    setIsAuth(true);
  };
  
  // Sign up handler
  const signUpHandler = async (email, password) => {
    try {
      const result = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      })
      
      const data = await result.json();
      
      setIsAuth(true);
      setIsLoggedIn(true);
      setUserData(prevState => ({
        ...prevState,
        ...data
      }));
      localStorage.setItem("isLoggedIn", 1);
      localStorage.setItem("isAuth", 1);
      localStorage.setItem("userID", data["_id"]);
    } catch (err) {
      console.log(err);
    }
    setIsAuth(true);
    setIsLoggedIn(true);
  }

  // Logout Handler
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
      localStorage.removeItem("userID");
    } catch (err) {
      console.log(err);
    }
  };
  
  // Get User Info
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
  };

  // Set User Info
  const setUserInfo = (data) => {
    setUserData(prevState => ({
      ...prevState,
      ...data
    }));
  };
  
  // Create Account
  const createAcctHandler = async (acctName, balance, id) => {
    try {
      const result = await fetch("/account/open", {
        method: "POST",
        body: JSON.stringify({ acctName, balance, id }),
        headers: { "Content-Type": "application/json" }
      })
      
      const data = await result.json();
      
      setUserData(prevState => ({
        ...prevState,
        ...data
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const googleLoginHandler = async (email, password) => {
    try {
      const result = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      })
      
      const data = await result.json();
      
      setIsAuth(true);
      setIsLoggedIn(true);
      setUserData(prevState => ({
        ...prevState,
        ...data
      }));
      localStorage.setItem("isLoggedIn", 1);
      localStorage.setItem("isAuth", 1);
      localStorage.setItem("userID", data["_id"]);
    } catch (err) {
      console.log(err);
    }
  };

  const googleSignupHandler = async (email, password) => {
    try {
      const result = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      })
      
      const data = await result.json();
      
      setIsAuth(true);
      setIsLoggedIn(true);
      setUserData(prevState => ({
        ...prevState,
        ...data
      }));
      localStorage.setItem("isLoggedIn", 1);
      localStorage.setItem("isAuth", 1);
      localStorage.setItem("userID", data["_id"]);
    } catch (err) {
      console.log(err);
    }
  };

  const authContextValue = {
    isAuth: isAuth,
    isLoggedIn: isLoggedIn,
    userData: userData,
    setUserInfo: setUserInfo,
    onCreateAcct: createAcctHandler,
    onCheck: getUserInfo,
    onAuth: authHandler,
    onLogin: loginHandler,
    onSignup: signUpHandler,
    onLogout: logoutHandler,
    onGlLogin: googleLoginHandler,
    onGLSignup: googleSignupHandler
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