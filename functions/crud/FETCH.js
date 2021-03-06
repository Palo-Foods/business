/**
 * 1. Read data from the backend that comes through this http request function
 * 2. Functions: resolve()
 * 3. Parameters: url
 * 4. Token: authToken
 **/
import { tryStatement } from "../utils/tryStatement";

export const read = async (url) => {
  const sessionData = sessionStorage.getItem("user");
  const token = JSON.parse(sessionData);
  const authToken = token?.authToken;

  const config = {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${sessionData && authToken}`,
    },
    timeout: 5000,
  };

  const response = await tryStatement(url, config);
  return response;
};
