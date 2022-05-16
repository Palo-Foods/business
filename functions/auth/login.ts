/**
 * 1. Read data from the backend that comes through this http request function
 * 2. Functions: resolve()
 * 3. Parameters: url, data
 **/

import { tryStatement } from "../utils/tryStatement";

export const loginUser = async (url: string, data: object) => {
  const config = {
    method: "POST",
    headers: {
      ContentType: "application/json",
    },
    body: JSON.stringify(data),
    timeout: 5000,
  };

  //2. return response and error
  return (data = await tryStatement(url, config));
};
