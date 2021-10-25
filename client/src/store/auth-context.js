import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext({

});

const AuthProvider = ({ children }) => {
  const [ loggedInUser, setLoggedInUser ] = useState({});

  const authContextValue = {};

  return (
    <AuthContext.Provider 
      value={authContextValue}
    >
      { children }
    </AuthContext.Provider>
  )
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }