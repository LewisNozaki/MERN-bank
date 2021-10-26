import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={styles["main-header"]}>
      <h1><Link to="/">MERN Bank</Link></h1>
      <ul>
        <li><Link to="/profile">profile</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup" className={styles.btn}>Signup</Link></li>
      </ul>
    </nav>
  )
};

export default Header;