import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./Profile.module.css";

const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [isMounted, setIsMounted] = useState(true)

  const contextData = useContext(AuthContext);
  
  useEffect(() => {
    setUserEmail(contextData.userData.email);
    setUserInfo(contextData.userData);

    // if (isMounted) {
    //   const fetchData = async () => {
    //     const response = await fetch("/profile");
        
    //     const data = await response.json();
        
    //     if (data.isAuth) {
    //       setUserEmail(data.userInfo.email);
    //       setUserInfo(data.userInfo);
    //     }
    //   }
      
    //   fetchData();
    // }
    
    // setIsMounted(false);
  }, [contextData])
  
  return (
    <>
      {console.log(userInfo.accounts)}
      {userEmail && 
      <div>
        <h1>{`Welcome back, ${userEmail}`}!</h1>
        <div className={styles["accts-container"]}>
        {userInfo.accounts.map(acct => {
          return (
            <div key={acct["_id"]} className={styles["add-acct"]}> 
              <div>{acct.acctName}</div>
              <div>{acct.balance}</div>
            </div>
          )
        })}
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          {/* <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link>
          <Link to="/account/open" className={styles["add-acct"]}>Open a new account</Link> */}
        </div>
      </div>
      }
    </>
  )
}

export default Profile;