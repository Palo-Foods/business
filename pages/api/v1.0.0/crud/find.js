import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";

//used for login and others
export const find = async (collection, condition, projection) => {
  const { db } = await connectToDatabase();
  try {
    const response = await db
      .collection(collection)
      .findOne(condition, projection);
    return {
      status: 200,
      statusText: "OK",
      data: response,
    };
  } catch (error) {
    return {
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    };
  }
};

export const findOne = async (req, collection, condition, projection) => {
  const { db } = await connectToDatabase();
  const { method, match } = await verifyUser(req);

  try {
    if (method === "GET" && match) {
      const response = await db
        .collection(collection)
        .findOne(condition, projection);
      return {
        status: 200,
        statusText: "OK",
        data: response,
      };
    } else {
      return {
        status: 200,
        statusText: "Invalid method/missing data",
      };
    }
  } catch (error) {
    return {
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    };
  }
};

export const findAll = async (
  req,
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
