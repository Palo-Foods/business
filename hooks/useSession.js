import { useEffect, useState } from "react";

// Hook
export function useSessionStorage() {
  const [item, setItem] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    //check session
    const session = sessionStorage.getItem("user");
    const data = JSON.parse(session);
    setUser(data?.data);
  }, []);

  //set session storage
  const setSession = (key, value) => {
    const data = JSON.stringify(value);
    sessionStorage.setItem(key, data);
  };

  return { user, item, setSession };
}
