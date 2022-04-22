import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";

export const insert = async (collection, data) => {
  const { db } = await connectToDatabase();
  const response = await db.collection(collection).insertOne(data);

  return response;
};

export const insertOne = async (req, res, collection, condition, set) => {
  const { db } = await connectToDatabase();

  const { method, match } = verifyUser(req);
  try {
    if (method !== "POST" && match) {
      res.status(404).json({
        status: 404,
        statusText: "Invalid method",
      });

      return;
    }

    const response = await db.collection(collection).insertOne(condition, set);

    response.acknowledged &&
      res.json({
        status: 201,
        statusText: `You have successfully added data to ${collection}`,
      });

    res.json({
      status: 400,
      statusText: `Adding data to ${collection} failed`,
    });
  } catch (error) {
    res.json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
};
