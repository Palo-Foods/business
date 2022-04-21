// get session token and retrieve user data
export const getUserInSession = () => {
  //1. Access the user
  const sessionExist = sessionStorage.getItem("user");
  const user = JSON.parse(sessionExist);
  return user;
};

export const setUserInSession = (response) => {
  sessionStorage.setItem("user", JSON.stringify(response));
};

export const destroyUserInSession = () => {
  sessionStorage.removeItem("user");
};
