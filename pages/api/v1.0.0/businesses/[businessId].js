import { authenticate } from "../authentication";
import { updateOneEntry } from "../crud/update";

export default authenticate(async (req, res) => {
  const method = req.method;
  //dont set methods or anything, everything has already been done in the updateOneEntry function
  if (method !== "GET") {
    const body = JSON.parse(req.body);
    const set = {
      $set: {
        ...body,
      },
    };
    await updateOneEntry(req, res, "businesses", set);
  } else {
    await findOne(req, res, "businesses", { _id: ObjectId(id) });
  }
});
