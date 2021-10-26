import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userEmail, setUserEmail] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/profile");

      const data = await response.json();

      console.log(data);

      setUserEmail(data.userInfo.email);
    }
    
    fetchData();
  }, [userEmail])

  return (
    <div>
      <h1>{`Welcome back, ${userEmail}!`}!</h1>
    </div>
  )
}

export default Profile;