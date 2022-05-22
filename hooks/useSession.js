import { useEffect, useState } from "react";

export const useSessionStorage = (key) => {
  const [item, setItem] = useState({});

  const getSessionStorage = async () => {
    const session = sessionStorage.getItem(key);
    //console.table("session", JSON.parse(session));
    if (typeof session == "string") {
      const data = await JSON.parse(session);
      return data;
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      // You can await here
      const data = await getSessionStorage();
      if (data) {
        //console.log("data", data);
        setItem(data);
      }
      // ...
    }
    fetchData();
  }, []);

  const setSession = (value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    getSessionStorage();
  };

  const clearSession = () => {
    sessionStorage.clear(key);
    setItem(null);
    getSessionStorage();
  };

  return { item, setSession, clearSession };
};
