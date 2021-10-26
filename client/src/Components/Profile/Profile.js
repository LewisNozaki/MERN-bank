import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Profile = () => {
  const [userEmail, setUserEmail] = useState();

  const contextData = useContext(AuthContext);

  let history = useHistory();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/profile");
      
      const data = await response.json();

      if (data.isAuth) {
        contextData.onAuth();
        setUserEmail(data.userInfo.email);
        console.log(data);
      }

      if (!data.isAuth) {
        history.push("/login");
      }
    }
    
    fetchData();
  }, [ history, contextData ])

  return (
    <div>
      {userEmail && <h1>{`Welcome back, ${userEmail}!`}!</h1>}
    </div>
  )
}

export default Profile;