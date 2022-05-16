/**
 * 1. Custom hook for user authentication
 * 2. Functions: signUp, login
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { updateUser } from "../../functions/auth/updateUser";
import { useSessionStorage } from "../useSession";
import { useStates } from "../useStates";

export const useUpdateUser = () => {
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
  } = useStates();

  //1. signup user unto the platform
  const updateUserData = async (url, email, password, custom) => {
    setLoading(true);
    setMessage("");
    setError("");

    //put all info into data, and destructure custom
    const data = { email, password, ...custom };

    //1. send user data to database
    const response = await updateUser(url, data);

    const { statusCode, statusText } = response;

    if (statusCode === 201) {
      const { id, authToken, email, fullName, role, phone } = response?.data;
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
    updateUserData,
    statusCode,
  };
};
