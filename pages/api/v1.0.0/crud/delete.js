import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";

export const deleteOne = async (collection, id) => {
  const { db } = await connectToDatabase();
  const response = await db
    .collection(collection)
    .deleteOne({ _id: ObjectId(id) });

  console.log("delete ", response);
  if (response.deletedCount){
    return {
      status: 200,
      statusText: "Deleting successfully",
    };
  } else { 
     return {
       status: 400,
       statusText: "Deleting failed",
     };
  }
};
