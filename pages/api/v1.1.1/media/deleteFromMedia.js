import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";

export const deleteFromMedia = async (businessId, public_id) => {
  const { db } = await connectToDatabase();

  const deleteMedia = {
    $pull: { media: { public_id } },
  };
  //upload to media
  const media = await db
    .collection("media")
    .updateOne({ _id: ObjectId(businessId) }, deleteMedia, {
      returnDocuments: true,
      upsert: true,
    });

  if (media.matchedCount === 1) {
    return "success";
  } else {
    return "failed to push to media";
  }
};
