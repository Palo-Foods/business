import { del } from "../functions/del";
import { useStates } from "./useStates";
import { useStorage } from "./useStorage";

export const useDelete = (url) => {
  const { loading, setLoading, error, setError, message, setMessage, router } =
    useStates();

  const { sessionStorage } = useStorage("session");

  const deleteItem = async () => {
    setError(null);
    setLoading(true);

    //1. check if authToken
    const token = sessionStorage.getItem("user");

    const response = await del(url, token?.authToken);
    const result = await response.json();

    setLoading(false);

    if (response.status != 200) {
      setError(result?.msg);
      return;
    }

    setMessage(result?.msg);
  };

  return {
    loading,
    setLoading,
    message,
    error,
    setMessage,
    setError,
    deleteItem,
  };
};
