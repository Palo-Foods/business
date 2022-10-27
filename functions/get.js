export const get = async (url, authToken) => {
  const config = {
    method: "GET",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    timeout: 5000,
  };

  const response = await fetch(url, config);

  return response;
};
