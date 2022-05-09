import { connectToDatabase } from "../../../../lib/mongodb";

export const findOne = async (collection, filter, projection) => {
  const { db } = await connectToDatabase();
  const results = await db.collection(collection).findOne(filter, projection);
  //console.log(results)
  return results;
};


export const findAll = async (collection, filter, projection, numberOfItems) => {
  const { db } = await connectToDatabase();
  const results = await db
    .collection(collection)
    .find(filter, projection)
    .toArray(numberOfItems);

  return results;
};
