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
  const login = async (data) => {
    setLoading(true);
    setMessage("");
    setError("");
    setStatusCode(null)

    //1. send user data to database
    const response = await loginUser(url, data);
    console.log("response", response);

    const { statusCode, statusText } = response;

    if (statusCode === 200) {
      const { id, authToken, email, fullName, role, phone } = response?.data;
      console.log(response?.data)
      setLoading(false);
      setSession("user", {
        id,
        authToken,
        email,
        fullName,
        role,
        phone,
      });

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
