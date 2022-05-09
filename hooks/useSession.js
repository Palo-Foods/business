import { useEffect, useState } from "react";

export const useSessionStorage = (key) => {
  const [item, setItem] = useState("");

  const getSessionStorage = () => {
    const session = sessionStorage.getItem(key);
    if (typeof session == "string") {
      const data = JSON.parse(session);
      setItem(data);
    }
  };

  useEffect(() => {
    getSessionStorage();
  }, []);

  const setSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    getSessionStorage();
  };

  const clearSession = () => {
    sessionStorage.clear(key);
    setItem(null);
    getSessionStorage();
  };

  return [item, setSession, clearSession];
};
