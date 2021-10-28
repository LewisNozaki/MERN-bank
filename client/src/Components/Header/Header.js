import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./Header.module.css";

const Header = () => {
  const contextData = useContext(AuthContext);
  
  let history = useHistory("/");
  
  const handleLogOut = () => {
    contextData.onLogout();

    history.push("/");
  }

  return (
    <nav className={styles["main-header"]}>
      <h1><Link to="/">MERN Bank</Link></h1>
        {/* {console.log(contextData.isAuth)} */}
        { !contextData.isAuth && 
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup" className={styles.btn}>Signup</Link></li>
          </ul>
        }
        { contextData.isAuth && 
          <ul>
            <li><Link to="/profile">profile</Link></li>
            <li><button className={styles.btn} onClick={handleLogOut}>Log Out</button></li>
          </ul>
        }
    </nav>
  )
};

export default Header;