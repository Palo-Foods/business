export const getAll = async (url, authToken) => {
  const config = {
    method: "GET",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    timeout: 5000,
  };

  const response = await fetch(url, config);
  const results = response.json();
  console.log("results", results);
  return results;
};
