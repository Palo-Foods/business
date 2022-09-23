export const del = async (url, authToken) => {
  const config = {
    method: "delete",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    timeout: 5000,
  };

  const response = await fetch(url, config);

  return response;
};
