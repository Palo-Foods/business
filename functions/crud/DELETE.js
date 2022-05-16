/**
 * 1. Send data to the backend
 * 2. Functions: resolve()
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { tryStatement } from "../utils/tryStatement";

export const deleteData = async (url, data) => {
  const sessionData = sessionStorage.getItem("user");
  const token = JSON.parse(sessionData);
  const authToken = token?.authToken;

  const config = {
    method: "PUT",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${sessionData && authToken}`,
    },
    body: JSON.stringify(data && data),
    timeout: 5000,
  };

  const response = await tryStatement(url, config);
  return response;
};
