import { post } from "../functions/post";
import { useStates } from "./useStates";
import { useStorage } from "./useStorage";

export const usePost = (url) => {
  const { loading, setLoading, error, setError, message, setMessage } =
    useStates();

  const { sessionStorage } = useStorage("session");

  const addItem = async (data) => {
    setError(null);
    setLoading(true);

    //1. check if authToken
    const token = sessionStorage.getItem("user");

    const response = await post(url, token?.authToken, data);
    const result = await response.json();

    setLoading(false);

    if (response.status != 201) {
      setError(result?.msg);
      return;
    }

    setMessage(result?.msg);
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
