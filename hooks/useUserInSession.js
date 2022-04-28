import { useEffect, useState } from "react";

// get session token and retrieve user data
export const useUserInSession = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    //1. Access the user
    const sessionExist = sessionStorage.getItem("user");
    if (sessionExist) {
      const user = JSON.parse(sessionExist);
      const { email, fullName, phone } = user;
      setUserData({ email, fullName, phone });
    } else {
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [third])
  

  return { userData };
};
