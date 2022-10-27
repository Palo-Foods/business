export const post = async (url, authToken, data) => {
  const config = {
    method: "POST",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    timeout: 5000,
    body: JSON.stringify(data),
  };

  const response = await fetch(url, config);

  return response;
};
