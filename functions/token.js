// get session token and pass it when making request
export const getAuthToken = () => {
  //1. Access the authToken
  const sessionExist = sessionStorage.getItem("user");
  const authToken = JSON.parse(sessionExist)?.authToken;
  return { authToken, sessionExist };
};
