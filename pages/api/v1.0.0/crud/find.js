import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";

export const findOne = async (req, res, collection, condition, projection) => {
  const { db } = await connectToDatabase();
  const { method, match } = verifyUser(req);

  try {
    if (method === "GET" && match) {
      const response = await db
        .collection(collection)
        .findOne(condition, projection);
      response &&
        res.status(200).json({
          status: 200,
          statusText: "OK",
          data: response,
        });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
};

export const findAll = async (
  req,
  res,
  collection,
  condition,
  numberOfItems
) => {
  const { db } = await connectToDatabase();

  const { method, match } = verifyUser(req);

  try {
    if (method === "GET" && match) {
      const response = await db
        .collection(collection)
        .find(condition)
        .toArray(numberOfItems);

      response &&
        res.status(200).json({
          status: 200,
          statusText: "OK",
          data: response,
        });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
};
