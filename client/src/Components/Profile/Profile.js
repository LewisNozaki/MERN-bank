import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./Profile.module.css";

const Profile = () => {
  const [userEmail, setUserEmail] = useState();
  // const [userData, setUserData] = useState({});

  let contextData = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/profile");
      
      const data = await response.json();
      
      if (data.isAuth) {
        setUserEmail(data.userInfo.email);
      }
    }
    
    fetchData();
  }, [])
  
  return (
    <>
      {console.log(contextData.userData["_id"])}
      {userEmail && 
      <div>
        <h1>{`Welcome back, ${userEmail}`}!</h1>
        <div className={styles["accts-container"]}>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
        </div>
      </div>
      }
    </>
  )
}

export default Profile;