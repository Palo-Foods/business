import { connectToDatabase } from "../../../../lib/mongodb";

//used for login and signup
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

export const findOne = async (collection, condition, projection) => {
  try {
    const { db } = await connectToDatabase();
    const response = await db
      .collection(collection)
      .findOne(condition, projection);

    //console.log("find one", response);

    if (response.email) {
      return {
        status: 200,
        statusText: "OK",
        data: response,
      };
    } else {
      return {
        status: 404,
        statusText: "Not found",
      };
    }
  } catch (error) {
    //console.log("find one error", error.message);
    return {
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    };
  }
};

export const findAll = async (
  collection,
  condition,
  projection,
  numberOfItems
) => {
  try {
    const { db } = await connectToDatabase();
    console.log("db");

    const response = await db
      .collection(collection)
      .find(condition, projection)
      .toArray(numberOfItems);

   // console.log("find all response: " + response);

    if (response.length >= 0) {
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
  } catch (error) {
   // console.log("find all error ", error.message);
    return {
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    };
  }
};
