import { useEffect, useState } from "react";

export const useDataInSession = (type) => {
  const [dataInSession, setDataInSession] = useState();

  //check to see if data is in session
  useEffect(() => {
    const sessionData = sessionStorage.getItem(type);
    if (sessionData) {
       setDataInSession(sessionData);
    } else {
     
    }
  }, []);

  //set data into session
  const setDataInToSession = (data) => {
    if (data) {
      sessionStorage.setItem(type, JSON.stringify(data));
    }
  };

  return { dataInSession, setDataInToSession };
};
