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
    setError("")
    setData([])
    setLoading(true);
    const response = await read(url);
    setLoading(false);

    if (response?.statusCode === 200) {
      console.log("response", response);
      dispatch(setData(response?.data));
    } else {
      //navigate and logout on user not authenticated
      setError("error");
    }
  }

  useEffect(() => {
    //1. check if managers exist
    if (data?.length === 0) {
      //if not, fetch data
      fetchData();
    }
  }, []);

  return { loading, error, fetchData };
};
