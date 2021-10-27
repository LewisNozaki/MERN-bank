import React, { useState, useEffect } from "react";
// import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
  const [userEmail, setUserEmail] = useState();

  // const contextData = useContext(AuthContext);

  // let history = useHistory();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/profile");
      
      const data = await response.json();
      
      if (data.isAuth) {
        setUserEmail(data.userInfo.email);
      }

      // if (!data.isAuth) {
      //   history.push("/login");
      // }
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