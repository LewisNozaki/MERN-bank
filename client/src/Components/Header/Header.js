import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Router>
      <nav className={styles["main-header"]}>
        <h1><Link to="/">MERN Bank</Link></h1>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup" className={styles.btn}>Signup</Link></li>
        </ul>
      </nav>
      
      <div className="route-path">
        <Switch>
          <Route path="/" exact
            component={Home}
          />
          <Route path="/login/" exact
            component={Login}
          />
          <Route path="/signup/" exact
            component={Signup}
          />
          <Route path="*" exact
            component={NotFound}
          />
        </Switch>
      </div>
    </Router>
  )
};

export default Header;