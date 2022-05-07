/**
 * 1. Custom hook for user authentication
 * 2. Functions: signUp, login
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { useEffect } from "react";
import { loginSignUp } from "../../functions/auth/LOGIN-SIGNUP.ts";
import { postPutDelete } from "../../functions/crud/POST-PUT-DELETE.js";
import { destroyUserInSession, getUserInSession } from "../userInSession";
import { useStates } from "../useStates";
import { useUserInSession } from "../useUserInSession";

export const useAuth = () => {
  const { setUserToSession } = useUserInSession();
  const {
    loading,
    setLoading,
    error,
    setError,
    message,
    setMessage,
    user,
    setUser,
    statusCode,
    setStatusCode,
  } = useStates();

  useEffect(() => {
    const userData = getUserInSession();
    setUser(userData);
  }, []);

  //1. signup user unto the platform
  const signUp = async (url, email, password, custom) => {
    setLoading(true);
    setMessage("");
    setError("");

    //put all info into data, and destructure custom
    const data = { email, password, ...custom };

    //1. send user data to database
    const { response, error } = await loginSignUp(url, data);

    setLoading(false);

    if (response) {
      const { statusCode, statusText } = response;

      if (statusCode === 201) {
        const data = {
          authToken: response?.data?.authToken,
          email: response?.data?.email,
          fullName: response?.data?.fullName,
          role: response?.data?.role,
        };

        setUserToSession("user", data);
      }
      setStatusCode(statusCode);
      setMessage(statusText);
    } else {
      setStatusCode(500);
      setMessage(error);
    }
  };

  //1. signup user unto the platform
  const postPutDeleteData = async (url, data, method) => {
    setLoading(true);
    setMessage("");
    setError("");

    const token = user?.authToken;

    //1. send user data to database
    const { response, error } = await postPutDelete(url, data, method, token);

    setLoading(false);

    if (response) {
      const { statusCode, statusText } = response;

      setStatusCode(statusCode);
      setMessage(statusText);
    } else {
      setStatusCode(500);
      setMessage(error);
    }
  };

  //2. login user unto the platform
  const login = async (url, data) => {
    setLoading(true);
    setMessage("");
    setError("");

    //1. send user data to database
    const { response, error } = await loginSignUp(url, data);

    setLoading(false);

    if (response) {
      const { statusCode, statusText } = response;

      if (statusCode === 200) {
        const { id, authToken, email, fullName, role } = response?.data;
        const data = {
          id,
          authToken,
          email,
          fullName,
          role,
        };

        setUserToSession("user", data);
      }
      setStatusCode(statusCode);
      setMessage(statusText);
    } else {
      setStatusCode(500);
      setMessage(error);
    }
  };

  //2. login out user on the platform
  const logOut = async () => {
    setLoading(true);
    destroyUserInSession();
    setLoading(false);
    setMessage("Logged out");
  };

  return {
    loading,
    statusCode,
    message,
    error,
    setError,
    user,
    login,
    auth: {
      createUserWithEmailAndPassword: signUp,
      signInWithEmailAndPassword: login,
      addUpdateDeleteUser: postPutDeleteData,
      signOut: logOut,
    },
    postPutDeleteData,
  };
};
