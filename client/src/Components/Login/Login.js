import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <form className={styles["login-form"]}>
      <h2>Log In</h2>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" required />

      <label htmlFor="password">Password:</label>
      <input type="password" name="password" required />
      
      <input type="submit" value="Sign Up" /> 

      <p>Don't have an account?<a href="/signup">Sign up</a></p>
    </form>
  )
};

export default Login;