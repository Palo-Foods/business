import { crud } from "../functions/crud";
import { useStates } from "./useStates";
import { useStorage } from "./useStorage";

export const usePost = (url) => {
  const { loading, setLoading, error, setError, message, setMessage } = useStates();

  const { sessionStorage } = useStorage("session");

  const addItem = async (data) => {
    setError(null);
    setLoading(true);

    //1. check if authToken
    const token = sessionStorage.getItem("user");

    const { response, error } = await crud("POST", url, data, token?.authToken);

    setLoading(false);

    if (response.statusText != "Ok") {
      setError(result?.msg || error);
    } else {
      const result = await response.json();
      setMessage(result?.msg);
      return
    }
  };

  return {
    loading,
    message,
    error,
    setMessage,
    setError,
    addItem,
  };
};
