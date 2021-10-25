import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to MERN Bank.</h1>
      <p>Fast, safe and secure transactions for the modern day worker.</p>
      <Link to="/signup" className={styles.btn}>Get started today</Link>
    </div>
  )
};

export default Home;