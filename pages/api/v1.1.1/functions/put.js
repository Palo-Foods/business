import { ObjectId } from "mongodb";
import { createJwt } from "../jwt";
import { statusCode200, statusCode404 } from "../status/codes";
import { update } from "../db/update";

export const put = async (collection, id, res, set) => {
  //update user account
  const results = await update(collection, { _id: ObjectId(id) }, set); //returns data
  if (results.matchedCount === 1) {
    return "success";
  } else {
    return statusCode404(res);
  }
};
