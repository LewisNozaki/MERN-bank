import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={styles["main-header"]}>
      <h1><a href="/">MERN Bank</a></h1>
      <ul>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup" class="btn">Signup</a></li>
      </ul>
    </nav>
  )
};

export default Header;