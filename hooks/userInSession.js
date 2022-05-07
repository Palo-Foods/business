// get session token and retrieve user data
export const getUserInSession = () => {
  //1. Access the user
  const session = sessionStorage?.getItem("user");
  const userData = JSON.parse(session);
  const user = userData?.data;
  return user;
};

export const setUserInSession = (response) => {
  sessionStorage.setItem("user", JSON.stringify(response));
};

export const destroyUserInSession = () => {
  sessionStorage.removeItem("user");
};
