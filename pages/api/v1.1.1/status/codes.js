export const statusCode200 = (res, data, message) => {
  return res.status(200).json({ statusCode: 200, statusText: message, data });
};

export const statusCode201 = (res, message) => {
  return res.status(201).json({ statusCode: 201, statusText: message });
};

export const statusCode401 = (res, statusText) => {
  return res
    .status(401)
    .json({ statusCode: 401, statusText: statusText || "Unauthorized" });
};

export const statusCode403 = (res, statusText) => {
  return res
    .status(403)
    .json({ statusCode: 403, statusText: statusText || "Data already exist" });
};

export const statusCode404 = (res, statusText) => {
  return res
    .status(404)
    .json({ statusCode: 404, statusText: statusText || "Data not found" });
};

export const statusCode405 = (res) => {
  return res
    .status(405)
    .json({ statusCode: 405, statusText: "Invalid method" });
};

export const statusCode500 = (res, error) => {
  return res.status(500).json({
    statusCode: 500,
    statusText: "Internal server error",
    error: error.message,
  });
};
