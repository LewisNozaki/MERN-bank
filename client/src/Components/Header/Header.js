import React from "react";
import { Route, Link, HashRouter } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Home from "../Home/Home";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <HashRouter>
      <nav className={styles["main-header"]}>
        <h1><Link to="/">MERN Bank</Link></h1>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup" className={styles.btn}>Signup</Link></li>
        </ul>
      </nav>
      
      <div className="route-path">
        <Route path="/" exact
          component={() => <Home />}
        />
        <Route path="/login" 
          component={() => <Login />}
        />
        <Route path="/signup" 
          component={() => <Signup />}
        />
      </div>
    </HashRouter>
  )
};

export default Header;