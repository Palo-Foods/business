import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";
import { deleteOne } from "./delete";

export const updateOne = async (collection, condition, set, filter) => {
  const { db } = await connectToDatabase();
  const response = await db
    .collection(collection)
    .updateOne(condition, set, filter);

  if (response.matchedCount === 1) {
    return true;
  } else {
    return false;
  }
};

export const addToArray = async (collection, condition, set, filter) => {
  const response = await updateOne(collection, condition, set, filter);
  if (response.matchedCount === 1) {
    return true;
  } else {
    return false;
  }
};

export const removeFromArray = async (collection, condition, set, filter) => {
  const response = await updateOne(collection, condition, set, filter);
  if (response.modifiedCount === 1) {
    return true;
  } else {
    return false;
  }
};

export const updateOneEntry = async (req, res, collection, set, filter) => {
  const { method, match } = await verifyUser(req);
  const { id } = req.query;

  try {
    if (method === "PUT" && match) {
      const response = await updateOne(
        collection,
        { _id: ObjectId(id) },
        set,
        filter
      );

      response &&
        res
          .status(200)
          .json({ status: 200, statusText: `Data updated in ${collection}` });
    } else {
      res.status(401).json({ status: 401, statusText: "Invalid method" });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
};
