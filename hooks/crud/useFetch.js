/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, fetch items,
 * 3. Parameters: url
 **/
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { read } from "../../functions/crud/FETCH";
import { getUserInSession } from "../userInSession";
import { useStates } from "../useStates";
import { useUserInSession } from "../useUserInSession";

export const useFetch = (url, data, setData) => {
  const { loading, setLoading, error, setError } = useStates();
  const dispatch = useDispatch();

   const { user } = useUserInSession();

  //1. fetch data
  async function fetchData() {
    setLoading(true);
    const token = user?.authToken;
    const { response, error } = await read(url, token);
    setLoading(false);
    console.log("me", response, error);

    if (response) {
      if (response?.status === 200) {
        dispatch(setData(response?.data));
      } else {
        //navigate and logout on user not authenticated
        setError("error");
      }
    } else {
      setError(error);
    }
  }

  useEffect(() => {
    //1. check if managers exist
    if (data?.length === 0) {
      const token = user?.authToken;
      //if not, fetch data
      fetchData(token);
    }
  }, []);

  return { loading, error, fetchData };
};
