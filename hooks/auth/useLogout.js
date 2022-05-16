/**
 * 1. Custom hook for user authentication
 * 2. Functions: signUp, login
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { useSessionStorage } from "../useSession";

export const useLogout = () => {
  const { clearSession } = useSessionStorage("user", null);

  //2. login out user on the platform
  const logOut = async () => {
    clearSession();
  };

  return {
    logOut,
  };
};
