import { ObjectId } from "bson";
import { connectToDatabase } from "../../../../lib/mongodb";

export const deleteFromMedia = async (shopId, public_id) => {
  const { db } = await connectToDatabase();

  const deleteMedia = {
    $pull: { media: { public_id } },
  };
  //upload to media
  const media = await db
    .collection("media")
    .updateOne({ _id: ObjectId(shopId) }, deleteMedia, {
      returnDocuments: true,
      upsert: true,
    });

  if (media.matchedCount === 1) {
    return "success";
  } else {
    return "failed to push to media";
  }
};
