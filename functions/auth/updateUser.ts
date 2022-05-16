/**
 * 1. Read data from the backend that comes through this http request function
 * 2. Functions: resolve()
 * 3. Parameters: url, data
 **/

import { tryStatement } from "../utils/tryStatement";

export const updateUser = async (url: string, data: object) => {
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
