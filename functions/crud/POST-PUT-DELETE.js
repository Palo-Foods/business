/**
 * 1. Send data to the backend
 * 2. Functions: resolve()
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { resolve } from "../resolve";

export const postPutDelete = async (url, data, method) => {
  const sessionData = sessionStorage.getItem("user");
  const { authToken } = JSON.parse(sessionData);

  const config = {
    method: method,
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(data && data),
    timeout: 5000,
  };

  try {
    const resp = await fetch(url, config);
    return resp.json();
  } catch (error) {
    return error.message;
  }
};
