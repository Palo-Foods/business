import { ObjectId } from "mongodb";
import { deleteOne } from "../db/delete";
import { statusCode200, statusCode404 } from "../status/codes";

export const deleteItem = async (collection, id, res) => {
  //delete account
  const response = await deleteOne(collection, { _id: ObjectId(id) });
  if (response.deletedCount === 1) {
    return statusCode200(res, {}, "Deleted data successfully");
  } else {
    return statusCode404(res);
  }
};
