import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();
  
  const usernameInput = (e) => {
    setEmail(e.target.value);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
  }
  
  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const result = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      })

      const data = await result.json();

      console.log(data);

      // Reset and Redirect
      setEmail('');
      setPassword('');
      history.push("/");
    } catch (err) {
      console.log(err);
    }
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