import { connectToDatabase } from "../../../../lib/mongodb";

export const deleteOne = async(collection, id) => {
   const { db } = await connectToDatabase();
  const response = db.collection(collection).delete({ _id: ObjectId(id) });
  if (response.modifiedCount === true) {
    return true;
  } else {
    return false;
  }
};
