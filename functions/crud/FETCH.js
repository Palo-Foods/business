/**
 * 1. Read data from the backend that comes through this http request function
 * 2. Functions: resolve()
 * 3. Parameters: url
 * 4. Token: authToken
 **/
import { resolve } from "../resolve";

export const read = async (url) => {
  //1. get auth toke. Check if session exist
  const sessionExist = sessionStorage.getItem("user");
  
  const user = JSON.parse(sessionExist);

  const config = {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${sessionExist ? user?.authToken : ""}`,
    },
    timeout: 5000,
  };

  //2. use the resolve function to process the request and response
  const [result, error] = await resolve(fetch(url, config));

  //3. return response and error
  return { response: await result?.json(), error: error?.message };
};
