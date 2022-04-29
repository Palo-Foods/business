/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, fetch items,
 * 3. Parameters: url
 **/
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { read } from "../../functions/crud/FETCH";
import { useAuth } from "../auth/useAuth";
import { useStates } from "../useStates";

export const useFetch = (url, data, setData) => {
  const { loading, setLoading, error, setError } = useStates();
  const { auth } = useAuth();
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    const response = await read(url);
    setLoading(false);
    if (response.status !== 200) {
      if (response.statusText.includes("Sorry")) {
        await auth.signOut();
        router.push("/");
      } else {
        setError(response.statusText);
      }
    } else {
      if (response.data) {
        dispatch(setData(response.data));
      } else {
        setError(response.statusText);
      }
    }
  };

  //fetch data
  useEffect(() => {
    //fetch data
    const getData = async () => {
      await fetchData();
    };

    if (data.length === 0) {
      getData();
    }
  }, []);

  return { loading, error, fetchData };
};
