import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  const contextData = useContext(AuthContext);
  
  const usernameInput = (e) => {
    setEmail(e.target.value);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      })
      
      const data = await result.json();

      console.log(data);

      contextData.onLogin();

      // Reset and Redirect
      setEmail('');
      setPassword('');
      history.push("/profile");
    } catch (err) {
      console.log(err);
    }
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