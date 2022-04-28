import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";

export const insertOne = async (req, collection, data) => {
  const { db } = await connectToDatabase();

  const { match } = await verifyUser(req);
  
  try {
    if (match) {
      const response = await db.collection(collection).insertOne(data);
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
    }
  } catch (error) {
    return {
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    };
  }
};
