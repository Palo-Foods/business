import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";

export const deleteOne = async (res, collection, id) => {
  const { db } = await connectToDatabase();
  console.log(collection, id);
  try {
    const response = await db
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });
    console.log("response", response);

    if (response.acknowledged === true && response.deletedCount) {
      res.status(200).json({ status: 200, statusText: "Data deleted" });
    } else {
      res.status(400).json({ status: 400, statusText: "Data deletion failed" });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
};
