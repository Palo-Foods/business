export const crud = async(method, url, body = {}, authToken = "") => {
const config = {
    method,
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    timeout: 5000,
    body: JSON.stringify(body),
  };

    try {
        const response = await fetch(url, config);

        return {response};
    } catch (error) {
        return {error: error.message}
    }
 
}