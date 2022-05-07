import { connectToDatabase } from "../../../../lib/mongodb";

export const update = async (collection, filter, update) => {
  const { db } = await connectToDatabase();
  const result = await db.collection(collection).updateOne(filter, update);
  return result;
};

//returns data
export const findOneAndUpdate = async (
  collection,
  filter,
  update,
  projection
) => {
  const { db } = await connectToDatabase();
  const result = await db
    .collection(collection)
    .findOneAndUpdate(filter, update, projection);
  console.log("findOneAndUpdate result", result);
  return result;
};

export const insertToArray = async (collection, filter, update, options) => {
  const { db } = await connectToDatabase();
  const result = await db
    .collection(collection)
    .updateOne(filter, update, options);
  return result;
};

export const removeFromArray = async (collection, condition, set, filter) => {
  const { db } = await connectToDatabase();
  const result = await db
    .collection(collection)
    .update(condition, set, filter);
  return result;
};
