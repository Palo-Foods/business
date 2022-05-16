export const tryStatement = async(url, config) => {
  try {
    const resp = await fetch(url, config);
    return resp.json();
  } catch (error) {
    return error.message;
  }
}