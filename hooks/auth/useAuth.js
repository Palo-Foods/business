/**
 * 1. Custom hook for user authentication
 * 2. Functions: signUp, login
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { useEffect } from "react";
import { loginSignUp } from "../../functions/auth/LOGIN-SIGNUP";
import { postPutDelete } from "../../functions/crud/POST-PUT-DELETE";
import {
  destroyUserInSession,
  getUserInSession,
  setUserInSession,
} from "../userInSession";
import { useStates } from "../useStates";

export const useAuth = () => {
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
      const { status, statusText } = response;

      if (status === 201) {
        //set user in session
        setUserInSession(response);

        //get user in session
        const userData = getUserInSession();

        //set user
        setUser(userData);
      }
      setStatusCode(status);
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
      const { status, statusText } = response;

      setStatusCode(status);
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
      const { status, statusText } = response;

      if (status === 200) {
        //set user in session
        setUserInSession(response);

        //get user in session
        const userData = getUserInSession();

        //set user
        setUser(userData);
      }
      setStatusCode(status);
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
