import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom"; 
import AuthContext from "../store/auth-context";

const PrivateRoute = ({ component:Component, ...rest }) => {
  const contextData = useContext(AuthContext);

  // useEffect(() => {
  //   contextData.onCheck()
  // }, [contextData])

  return (
    <>
      <Route {...rest} render={() => contextData.isAuth ? <Component /> : <Redirect to="/login" />} />
    </>
  )
};

export default PrivateRoute;