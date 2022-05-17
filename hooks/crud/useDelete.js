/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, post, put, delete
 * 3. Parameters: url, data, method
 **/
import { deleteData } from "../../functions/crud/DELETE";
import { useStates } from "../useStates";

export const useDelete = () => {
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
  const deleteUserData = async (url, data) => {
    setLoading(true);
    const response = await deleteData(url, data);
    setLoading(false);

    const { statusText, statusCode, error } = response;

    //navigate and logout on user not authenticated
    setError(error);

    setStatusCode(statusCode);
    setMessage(statusText);
  };

  return { loading, error, setError, statusCode, message,setMessage, deleteUserData };
};
