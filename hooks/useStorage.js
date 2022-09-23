import { useEffect, useMemo, useState } from "react";

export const useStorage = (type) => {
  const [data, setData] = useState();

  const sessionStorage = useMemo(() => {
    return {
      getItem(key) {
        if (typeof window !== "undefined") {
          const storage = window?.sessionStorage.getItem(key);
          //console.log("storage", storage);
          if (storage) {
            //console.log(JSON.parse(storage));
            return JSON.parse(storage);
          }
        }
      },

      setItem(key, value) {
        if (value)
          if (typeof window !== "undefined") {
            window?.sessionStorage.setItem(key, JSON.stringify(value));

            this.getItem(key);
          }
      },

      clearItem(key) {
        if (typeof window !== "undefined") {
          window?.sessionStorage.removeItem(key);

          this.setItem(null);
        }
      },

      clearSession() {
        if (typeof window !== "undefined") {
          window?.sessionStorage.clear();
          this.setItem(null);
        }
      },
    };
  }, []);

  const localStorage = useMemo(() => {
    return {
      getItem(key) {
        if (typeof window !== "undefined") {
          const storage = window?.localStorage.getItem(key);
          if (storage) return JSON.parse(storage);
        }
      },

      setItem(key, value) {
        if (value)
          if (typeof window !== "undefined") {
            window?.localStorage.setItem(key, JSON.stringify(value));

            this.getItem(key);
          }
      },

      clearItem(key) {
        if (typeof window !== "undefined") {
          localStorage.clear(key);
          this.setItem(null);
          this.getItem(key);
        }
      },
    };
  }, []);

  //check if item exist
  useEffect(() => {
    if (type == "session") {
      const sessionData = sessionStorage.getItem();
      setData(sessionData);
    }

    if (type == "local") {
      const localData = localStorage.getItem();
      setData(localData);
    }
  }, [localStorage, sessionStorage, type]);

  return { data, sessionStorage, localStorage };
};
