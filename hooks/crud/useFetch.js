/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, fetch items,
 * 3. Parameters: url
 **/
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { read } from "../../functions/crud/FETCH";
import { useStates } from "../useStates";
import { useSessionStorage } from "../useSession";

export const useFetch = (url, data, setData) => {
  const { loading, setLoading, error, setError } = useStates();
  const dispatch = useDispatch();

  const { setSession, item } = useSessionStorage(url);

  //1. fetch data
  async function fetchData() {
    setError("");
    setData([]);
    setLoading(true);
    const response = await read(url);
    setLoading(false);

    if (response?.statusCode === 200) {
      console.log("response", response);
      setSession(url, response?.data);
    } else {
      //navigate and logout on user not authenticated
      setError("error");
    }
  }

  useEffect(() => {
    //1. check if session exist
    if (!item) {
      fetchData();
    } else {
       console.log("item", item);
      dispatch(setData(item));
    }
  }, [item]);

  return { loading, error, fetchData };
};
