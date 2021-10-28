import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./Signup.module.css";
import { GoogleLogin } from "react-google-login";

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

  const googleSuccess = async (res) => {
    console.log(res)
    const email = res?.profileObj.email;
    const password = res?.tokenId;

    try {
      const response = await contextData.onGLSignup(email, password);

      console.log(response);
      
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => console.log("Google sign in was not successful.", err);

  return (
    <div className={styles["signup-form"]}>
    <form onSubmit={handleSignup}>
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
    </form>

    <GoogleLogin 
    clientId="1070274722780-0b22ojvm6ikn9nc5vfge7oibdujvspta.apps.googleusercontent.com"
    render={(props) => (
      <button 
        className={styles["google-btn"]}
        onClick={props.onClick}
        disabled={props.disabled}
        >
        <img alt="" src="https://www.pngkit.com/png/full/178-1783296_g-transparent-circle-google-logo.png"></img>
        Sign in with Google
      </button>
    )}
    onSuccess={googleSuccess}
    onFailure={googleFailure}
    cookiePolicy={"single_host_origin"}
    />

    <p>Already have an account?<Link to="/login">Login</Link></p>
    </div>
  )
};

export default Signup;