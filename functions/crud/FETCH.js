/**
 * 1. Read data from the backend that comes through this http request function
 * 2. Functions: resolve()
 * 3. Parameters: url
 * 4. Token: authToken
 **/
import { resolve } from "../resolve";

export const read = async (url) => {
  const sessionData = sessionStorage.getItem("user");
  const { authToken } = JSON.parse(sessionData);

  const config = {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    timeout: 5000,
  };
  try {
    const resp = await fetch(url, config);
    return resp.json();
  } catch (error) {
    return error.message;
  }
};
