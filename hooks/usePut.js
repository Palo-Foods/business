import { useEffect, useState } from "react";
import { put } from "../functions/put";
import { useStates } from "./useStates";
import { useStorage } from "./useStorage";
import { useUser } from "./useUser";

export const usePut = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const { user } = useUser("user");
  const { router } = useStates();

  const { sessionStorage } = useStorage("session");

  const updateItem = async (data) => {
    setIsError(null);
    setIsLoading(true);

    //1. check if authToken
    const token = sessionStorage.getItem("user");

    const response = await put(url, token?.authToken, data);
    const result = await response.json();

    setIsLoading(false);

    if (response.status != 200) {
      setIsError(result?.msg);
      return;
    }

    if (result?.user_data && !user?.id) {
      sessionStorage.setItem("user", result?.user_data);
      router?.reload();
    }

    setIsMessage(result?.msg);
  };

  return {
    isLoading,
    isMessage,
    isError,
    setIsMessage,
    setIsError,
    updateItem,
  };
};
