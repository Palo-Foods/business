import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";

export const pushToMedia = async (shopId, public_id, url) => {
  const { db } = await connectToDatabase();
  const updateMedia = {
    $push: { media: { public_id, url } },
  };
  //upload to media
  const media = await db
    .collection("media")
    .updateOne({ _id: ObjectId(shopId) }, updateMedia, {
      returnDocuments: true,
      upsert: true,
    });

  if (media.matchedCount === 1) {
    return "success";
  } else {
    return "failed to push to media";
  }
};
