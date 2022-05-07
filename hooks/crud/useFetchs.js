import cache from "memory-cache";
/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, fetch items,
 * 3. Parameters: url
 **/
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { read } from "../../functions/crud/FETCH";
import { useAuth } from "../auth/useAuth";
import { useStates } from "../useStates";

export const useFetch = (url, data, setData, type) => {
  const { loading, setLoading, error, setError } = useStates();
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    const response = await read(url);
    setLoading(false);
    if (response.status !== 200) {
      if (response?.statusText?.includes("Sorry")) {
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

  //2. if there is no data in session, then fetch data
  //fetch data
  useEffect(() => {
    //fetch data
    const getData = async () => {
      await fetchData();
    };

    if (data.length === 0 && url) {
      getData();
    }
  }, []);

  return { loading, error, fetchData };
};
