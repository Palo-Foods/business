export const del = async (url, authToken) => {
  const config = {
    method: "DELETE",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    timeout: 5000,
  };

  console.log(config)

  const response = await fetch(url, config);

  return response;
};
