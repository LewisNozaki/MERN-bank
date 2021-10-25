import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <form className={styles["login-form"]}>
      <h2>Log In</h2>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" required />

      <label htmlFor="password">Password:</label>
      <input type="password" name="password" required />
      
      <input type="submit" value="Log in" /> 

      <p>Don't have an account?<Link to="/signup">Sign up</Link></p>
    </form>
  )
};

export default Login;