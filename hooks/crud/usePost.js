/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, post, put, delete
 * 3. Parameters: url, data, method
 **/
import { post } from "../../functions/crud/POST";
import { useStates } from "../useStates";

export const usePost = () => {
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

  //this function makes an https request
  //you can make a post, put or delete request to the server
  const postData = async (url, data) => {
    setLoading(true);
    const response = await post(url, data);
    console.log("response", response);
    setLoading(false);

    const { statusText, statusCode, error } = response;

    //navigate and logout on user not authenticated
     setError(error);

    setStatusCode(statusCode);
    setMessage(statusText); 
  };

  return { loading, error, setError, statusCode, message, postData };
};
