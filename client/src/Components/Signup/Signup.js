import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  let history = useHistory();

  const contextData = useContext(AuthContext);

  useEffect(() => {
    if (contextData.isAuth) {
      history.push("/profile");
    }
  }, [history, contextData.isAuth])

  
  const usernameInput = (e) => {
    setEmail(e.target.value);
  };
  
  const passwordInput = (e) => {
    setPassword(e.target.value);
  }
  
  const handleSignup = (e) => {
    e.preventDefault();
    contextData.onSignup(email, password);

    setEmail('');
    setPassword('');
  };

  return (
    <form className={styles["signup-form"]} onSubmit={handleSignup}>
      <h2>Sign Up</h2>

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
        value="Sign up"
      /> 

      <p>Already have an account?<Link to="/login">Login</Link></p>
    </form>
  )
};

export default Signup;