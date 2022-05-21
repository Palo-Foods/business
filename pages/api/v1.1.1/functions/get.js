import { ObjectId } from "mongodb";
import { find, findOne } from "../db/find";
import { statusCode200, statusCode404 } from "../status/codes";

export const get = async (collection, userId, res, projection) => {
  const results = await findOne(
    collection,
    { _id: ObjectId(userId) },
    projection
  );
  if (results === null) {
    return statusCode200(res, [], "OK");
  }
  if (results?._id) {
    return statusCode200(res, results, "OK");
  } else {
    return statusCode404(res);
  }
};
