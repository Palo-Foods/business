/**
 * 1. Read data from the backend that comes through this http request function
 * 2. Functions: resolve()
 * 3. Parameters: url, data
 **/

import { resolve } from "../resolve";

export const loginSignUp = async (url: string, data: object) => {
  const config = {
    method: "POST",
    headers: {
      ContentType: "application/json",
    },
    body: JSON.stringify(data),
    timeout: 5000,
  };
  //1. use the resolve function to process the request and response
  const [result, error] = await resolve(fetch(url, config));

  //2. return response and error
  return { response: await result?.json(), error: error?.message };
};
