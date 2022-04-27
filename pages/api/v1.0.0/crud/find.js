import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";

export const find = async (collection, condition, projection) => {
  const { db } = await connectToDatabase();
  const response = await db
    .collection(collection)
    .findOne(condition, projection);

  return response;
};

export const findOne = async (req, res, collection, condition, projection) => {
  const { db } = await connectToDatabase();
  const { method, match } = await verifyUser(req);

  try {
    if (method === "GET" && match) {
      const response = await db
        .collection(collection)
        .findOne(condition, projection);
      if (response)
        return res.status(200).json({
          status: 200,
          statusText: "OK",
          data: response,
        });
    }
  } catch (error) {
    return res.status(500).json({
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
  projection,
  numberOfItems
) => {
  const { db } = await connectToDatabase();

  const { method, match } = await verifyUser(req);

  console.log(method, match);

  try {
    if (method === "GET" && match) {
      const response = await db
        .collection(collection)
        .find(condition, projection)
        .toArray(numberOfItems);

      if (response.length > 0 || response.length === 0) {
        return {
          status: 200,
          statusText: "OK",
          data: response,
        };
      } else {
        return {
          status: 404,
          statusText: "Data not found",
        };
      }
    } else {
      return {
        status: 401,
        statusText: "Invalid method/not logged in",
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    };
  }
};
