import { useCallback, useEffect, useState } from "react";
import { get } from "../functions/get";
import { useStates } from "./useStates";

export const useGet = (url) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("")
  const { loading, error, setLoading, setError, message, setMessage } = useStates();


  const getItems = useCallback(async () => {
    const session = sessionStorage.getItem("user");
    const user = JSON.parse(session)

    setStatus("loading")

    const response = await get(url, user?.authToken);

    const result = await response.json();

    if (response.status == 500) { 
      setStatus("error")
      return
    }

    if (response.status != 200) {
      !result?.msg && setData(result);
      
      setStatus("info")
    }

    if(response.status == 200){
      result && setData(result);
      if (result?.length > 0) sessionStorage.setItem(url, result);
      setStatus("success")
    }
  }, [sessionStorage, setError, setLoading, url]);

  useEffect(() => {
    async function getData() {
      await getItems();
    }
    getData();
     
  }, [url]);

  return { loading, error, getItems, data, message, setMessage, status };
};
