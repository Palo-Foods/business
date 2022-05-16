/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, fetch items,
 * 3. Parameters: url
 **/
import { useEffect, useState } from "react";
import { read } from "../../functions/crud/FETCH";

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  const fetchData = async () => {
    setError(null)
    const response = await read(url);
    const { statusText, statusCode, error, data } = response;
    if (statusCode === 200) {
      setData(data);
      console.log("data", data);
    } else {
      setError(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading: !data && !error, data, error, fetchData };
};
