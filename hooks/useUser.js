import { useCallback, useEffect, useState } from "react";
import { useStates } from "./useStates";

export const useUser = (type) => {
  const [user, setUser] = useState(null);

  const { loading, setLoading, error, setError, message, setMessage, router } = useStates();

  const getUserInSession = useCallback(() => {
    const session = sessionStorage.getItem("user");
    const user = JSON.parse(session)
    if (user?.id) {
      setUser(user);
    } else {
      if (router?.asPath?.includes("dashboard")) {
        router?.push("/login");
      }
    }
  }, []);

  async function getCurrentUser() {
    setLoading(true);

    const response = await fetch("/api/v1.1.1/account");
    const result = await response.json();

    setLoading(false);

    //server error
    if (response.status != 200) {
      setError(result?.msg);
      return;
    }

    //create a new session object
    sessionStorage.setItem("user", response);
  }

  async function register(data) {
    setLoading(true);

    const config = {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(data),
      timeout: 5000,
    };

    const response = await fetch("/api/v1.1.1/account/create", config);

    const result = await response.json();

    setLoading(false);

    //server error
    if (response.status != 201) {
      setError(result?.msg);
      return;
    }

    //create a new session object
    sessionStorage.setItem("user", result);

    router?.push("/");
  }

  async function login(data) {
    setLoading(true);

    const config = {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(data),
      timeout: 5000,
    };

    try {

      setError("")
      setMessage("")
    
      const response = await fetch("/api/v1.1.1/account/login", config);

      const result = await response.json();

      setLoading(false);

      //server error
      if (response.status != 200) {
        setError(result.msg.includes("query") ? "There was an error" : result.msg);
        return;
      }

      //create a new session object
      sessionStorage.setItem("user", JSON.stringify(result));
      router?.push("/dashboard")
        
    } catch (error) {
      setError(error.message);
    }
  }

  async function updateUser(data) {
    //1. check if authToken
    const token = sessionStorage.getItem("user");

    setLoading(true);
    const config = {
      method: "PUT",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token?.authToken}`,
      },
      body: JSON.stringify(data),
      timeout: 5000,
    };

    try {
      setError("")
      setMessage("")
      const response = await fetch(`/api/v1.1.1/account`, config);
      const result = await response.json();

      setLoading(false);

      if (response.status == 500) {
        setError(result.msg.includes("query") ? "There was an error" : result.msg);
        return;
      }

      //server error
      if (response.status != 200) {
        setError(result?.msg);
        return;
      }

      //create a new session object
      sessionStorage.setItem("user", JSON.stringify(result));

      setMessage("Account updated")
    } catch (error) {
       setError(error.message);
    }
  }

  const clear = () => {
    setLoading(false);
    setError("");
    setMessage("");
  };

  function signOut() {
    sessionStorage.clear()
    router?.push("/");
  }

  useEffect(() => {
    if (type == "user") {
      getUserInSession();
    }
  }, [type]);

  return {
    user,
    message,
    loading,
    error,
    clear,
    register,
    login,
    signOut,
    updateUser,
    getCurrentUser,
    getUserInSession
  };
};
