// get session token and pass it when making request
export const getAuthToken = async() => {
  //1. Access the authToken
  const sessionExist = sessionStorage?.getItem("user");
  const authToken = await JSON.parse(sessionExist)?.authToken;
  return { authToken, sessionExist };
};
