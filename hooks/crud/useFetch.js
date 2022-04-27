/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, fetch items,
 * 3. Parameters: url
 **/
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { read } from "../../functions/crud/FETCH";
import { useStates } from "../useStates";

export const useFetch = (url, data, setData) => {
  const { loading, setLoading, error, setError } = useStates();
  const dispatch = useDispatch();

  //1. fetch data
  async function fetchData() {
    setLoading(true);
    const response = await read(url);
    if (response.status !== 200) {
      setLoading(false);
      setError(response.statusText);
    } else {
      setLoading(false);
      if (response.data > 0 || response.data === 0) {
        dispatch(setData(response.data));
      }
    }
    console.log(response);
  }

  useEffect(() => {
    //1. check if managers exist
    if (data?.length === 0) {
      fetchData();
    }
  });

  return { loading, error, fetchData };
};
