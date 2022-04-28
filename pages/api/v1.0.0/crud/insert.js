import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";

export const insertOne = async (req, res, collection, data) => {
  const { db } = await connectToDatabase();

  const { method, match } = await verifyUser(req);
  try {
    if (method !== "POST" && match) {
      res.status(404).json({
        status: 404,
        statusText: "Invalid method",
      });

      return;
    }

    const response = await db.collection(collection).insertOne(data);
console.log("response", response);
    if (response.acknowledged) {
      return {
        status: 201,
        statusText: `You have successfully added data to ${collection}`,
      };
    } else {
      return {
        status: 400,
        statusText: `Adding data to ${collection} failed`,
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
