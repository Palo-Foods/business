import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";

export const pushToMedia = async (businessId, public_id, url) => {
  const { db } = await connectToDatabase();
  const updateMedia = {
    $push: { media: { public_id, url } },
  };
  //upload to media
  const media = await db
    .collection("media")
    .updateOne({ _id: ObjectId(businessId) }, updateMedia, {
      returnDocuments: true,
      upsert: true,
    });

  if (media.acknowledged === true) {
    return "success";
  } else {
    return "failed to push to media";
  }
};
