import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();
  
  const contextData = useContext(AuthContext);
  
  useEffect(() => {
    if (contextData.isAuth) {;
      history.push("/profile");
    }
  }, [history, contextData])
  
  const usernameInput = (e) => {
    setEmail(e.target.value);
  };
  
  const passwordInput = (e) => {
    setPassword(e.target.value);
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();

    contextData.onLogin(email, password);
  }
  
  return (
    <form className={styles["login-form"]} onSubmit={handleLogin}>
      <h2>Log In</h2>
      <label htmlFor="email">Email:</label>
      <input 
        type="email" 
        name="email"
        value={email}
        onChange={usernameInput}
        autoComplete="off"
        required 
      />
      
      <label htmlFor="password">Password:</label>
      <input 
        type="password" 
        name="password" 
        value={password}
        onChange={passwordInput}
        autoComplete="off"
        required
      />
      
      <input 
        type="submit" 
        value="Log in" 
      /> 

      <p>Don't have an account?<Link to="/signup">Sign up</Link></p>
    </form>
  )
};

export default Login;