import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const usernameInput = (e) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
    setIsValid(true);
  }

  const handleSignup = (e) => {
    e.preventDefault();

    console.log({ email, password });

    

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
        disabled={!isValid}
      /> 

      <p>Already have an account?<Link to="/login">Login</Link></p>
    </form>
  )
};

export default Signup;