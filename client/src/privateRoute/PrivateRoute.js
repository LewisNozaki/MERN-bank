import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom"; 
import AuthContext from "../store/auth-context";

const PrivateRoute = ({ component:Component, ...rest }) => {
  const contextData = useContext(AuthContext);
  
  return (
    <>
      <Route {...rest} render={(props) => contextData.isAuth ? 
        <Component {...props}/> : 
        <Redirect to="/login" />} />
    </>
  )
};

export default PrivateRoute;