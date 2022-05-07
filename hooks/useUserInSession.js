import { useEffect, useState } from "react";
import { useStates } from "./useStates";

// Hook
export function useUserInSession() {
  const { user, setUser, router } = useStates();

  const getUserInSession = () => {
    //check session
    const session = sessionStorage.getItem("user");
    const data = JSON.parse(session);
    setUser(data);
  };

  useEffect(() => {
    getUserInSession();
  }, []);

  //set session storage
  const setUserToSession = (key, value) => {
    const data = JSON.stringify(value);
    sessionStorage.setItem(key, data);
    getUserInSession();
    user?.email && router.push("/dashboard");
  };

  return { user, setUserToSession };
}
