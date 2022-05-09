/**
 * 1. Custom hook for user authentication
 * 2. Functions: signUp, login
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { loginSignUp } from "../../functions/auth/LOGIN-SIGNUP.ts";
import { postPutDelete } from "../../functions/crud/POST-PUT-DELETE.js";
import { useSessionStorage } from "../useSession";
import { useStates } from "../useStates";

export const useAuth = () => {
  const [user, setUser, clearSession] = useSessionStorage("user", null);
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
        const { id, authToken, email, fullName, role } = response?.data;

        setUser("user", {
          id,
          authToken,
          email,
          fullName,
          role,
        });
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

    //1. send user data to database
    const response = await postPutDelete(url, data, method);

    setLoading(false);

    if (response.statusCode === 200) {
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
        setUser("user", {
          id,
          authToken,
          email,
          fullName,
          role,
        });
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
    //destroyUserInSession();
    clearSession();
    setLoading(false);
    setMessage("Logged out");
  };

  return {
    loading,
    setLoading,
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
