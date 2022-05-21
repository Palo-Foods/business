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
  return result;
};

export const insertToArray = async (collection, condition, set, options, upsert) => {
  const { db } = await connectToDatabase();
  const result = await db
    .collection(collection)
    .updateOne(condition, set, options, upsert);
  return result;
};

export const removeFromArray = async (collection, condition, set, filter) => {
  const { db } = await connectToDatabase();
  const result = await db
    .collection(collection)
    .updateOne(condition, set, filter);
  return result;
};
