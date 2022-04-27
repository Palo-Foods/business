import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";
import { verifyUser } from "../verification";

export const deleteOne = async (collection, id) => {
  const { db } = await connectToDatabase();
  const { method, match } = await verifyUser(req);

  if (method === "DELETE" && match) {
    const response = await db
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });
      
    if (response)
      return {
        status: 200,
        statusText: "Deleting successfully completed",
      };
  } else {
    console.log(error.message);
    return {
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    };
  }
};
