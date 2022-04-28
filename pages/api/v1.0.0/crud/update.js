import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";

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

export const updateOneEntry = async (req, collection, set, filter) => {
  const { match } = await verifyUser(req);
  const { id } = req.query;

  try {
    if (match) {
      const response = await updateOne(
        collection,
        { _id: ObjectId(id) },
        set,
        filter
      );

      if (response.matchedCount === 1) {
        return { status: 200, statusText: `Data updated in ${collection}` };
      } else {
        return {
          status: 404,
          statusText: `Data updated in ${collection} failed`,
        };
      }
    } else {
      return { status: 401, statusText: "Unauthorized" };
    }
  } catch (error) {
    return {
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    };
  }
};
