import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [userEmail, setUserEmail] = useState();

  let history = useHistory();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/profile");
      
      const data = await response.json();

      if (data.isAuth) {
        setUserEmail(data.userInfo.email);
      }

      if (!data.isAuth) {
        history.push("/login");
      }

    }
    
    fetchData();
  }, [history])

  return (
    <div>
      <h1>{`Welcome back, ${userEmail}!`}!</h1>
    </div>
  )
}

export default Profile;