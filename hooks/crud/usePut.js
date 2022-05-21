/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, post, put, delete
 * 3. Parameters: url, data, method
 **/
import { put } from "../../functions/crud/PUT";
import { useSessionStorage } from "../useSession";
import { useStates } from "../useStates";

export const usePut = () => {
  const {
    loading,
    setLoading,
    error,
    setError,
    message,
    setMessage,
    statusCode,
    setStatusCode,
  } = useStates();
  const { setSession } = useSessionStorage("user", null);

  //this function makes an https request
  //you can make a post, put or delete request to the server
  const putData = async (url, userData) => {
    setLoading(true);
    const response = await put(url, userData);
    setLoading(false);

    const { statusText, statusCode, error, data } = response;
    //navigate and logout on user not authenticated
    setError(error);

    setStatusCode(statusCode);
    setMessage(statusText);

    //if data has id, then update session storage for user
    if (data.id) {
      console.log("data", data)
      setSession("user", data);
    }
  };

  return { loading, error, setError, statusCode, message, putData };
};
