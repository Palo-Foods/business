/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, post, put, delete
 * 3. Parameters: url, data, method
 **/
import { useUtility } from "../useUtilities";
import { postPutDelete } from "../../functions/crud/POST-PUT-DELETE";

export const usePostPutDelete = () => {
  const { loading, setLoading, error, setError, message, setMessage } =
    useUtility();

  //this function makes an https request
  //you can make a post, put or delete request to the server
  const postPutDeleteData = async (url, data, method) => {
    setLoading(true);
    const { response, error } = await postPutDelete(url, data, method);
    setLoading(false);
    if (response) {
      const { statusText, error } = response;
      setMessage(statusText);
      setError(error);
    } else {
      setError(error);
    }
    console.log(response, error);
  };

  return { loading, error, message, postPutDeleteData };
};
