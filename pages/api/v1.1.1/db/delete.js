import { connectToDatabase } from "../../../../lib/mongodb";

export const deleteOne = async (collection, query) => {
  const { db } = await connectToDatabase();
  const result = await db.collection(collection).deleteOne(query);
  console.log("delete results", result)
  return result;
};
