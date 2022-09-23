import { useCallback, useEffect, useState } from "react";
import { get } from "../functions/get";
import { useStates } from "./useStates";
import { useStorage } from "./useStorage";

export const useGet = (url) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("")
  const { loading, error, setLoading, setError, message, setMessage } = useStates();
  const { sessionStorage } = useStorage("session");


  const getItems = useCallback(async () => {
    const token = sessionStorage.getItem("user");

    setStatus("loading")

    const response = await get(url, token?.authToken);

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
    const isData = sessionStorage.getItem(url);
    async function getData() {
      await getItems();
    }

    if (url && !isData) {
      getData();
      console.log("get-data")
    } else {
      setData(isData)
    }
  }, [getItems, sessionStorage, url]);

  return { loading, error, getItems, data, message, setMessage, status };
};
