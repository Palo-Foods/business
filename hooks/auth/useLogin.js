/**
 * 1. Custom hook for user authentication
 * 2. Functions: signUp, login
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { loginUser } from "../../functions/auth/login.ts";
import { useSessionStorage } from "../useSession";
import { useStates } from "../useStates";

export const useLogin = (url) => {
  const { setSession } = useSessionStorage("user", null);
  const {
    loading,
    setLoading,
    error,
    setError,
    message,
    setMessage,
    statusCode,
    setStatusCode,
    router,
  } = useStates();

  //2. login user unto the platform
  const login = async (userData) => {
    setLoading(true);
    setMessage("");
    setError("");
    setStatusCode(null)

    //1. send user data to database
    const response = await loginUser(url, userData);

    const { statusCode, statusText, data } = response;

    if (statusCode === 200) {
      console.log(response?.data)
      setLoading(false);
      setSession("user", ...data);

      setStatusCode(statusCode);
      setMessage(statusText);
      router.push("/dashboard/home");
    } else {
      setLoading(false);
      setStatusCode(statusCode);
      setMessage(statusText);
    }
  };

  return {
    loading,
    message,
    error,
    setError,
    login,
    statusCode,
  };
};
