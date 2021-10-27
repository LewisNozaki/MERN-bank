import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userEmail, setUserEmail] = useState();
  
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
    <div>
      {userEmail && <h1>{`Welcome back, ${userEmail}!`}!</h1>}
    </div>
  )
}

export default Profile;