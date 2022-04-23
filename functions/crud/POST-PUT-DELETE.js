/**
 * 1. Send data to the backend
 * 2. Functions: resolve()
 * 3. Parameters: url, data, method
 * 4. Token: authToken
 **/
import { resolve } from "../resolve";

export const postPutDelete = async (url, data, method) => {
  //1. get auth token. Check if session exist
  const sessionExist = sessionStorage.getItem("user");

  const user = JSON.parse(sessionExist);

  console.log("authToken", authToken);

  const config = {
    method: method,
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${sessionExist ? user?.authToken : ""}`,
    },
    body: JSON.stringify(data),
    timeout: 5000,
  };

  //2. use the resolve function to process the request and response
  const [result, error] = await resolve(fetch(url, config));

  //3. return response and error
  return { response: await result?.json(), error: error?.message };
};
