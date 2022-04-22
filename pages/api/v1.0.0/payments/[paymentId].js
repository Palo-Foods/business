import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { updateOneEntry } from "../crud/update";

export default authenticate(async (req, res) => {
  const method = req.method;
  const id = req.query; //needed for condition
  //dont set methods or anything, everything has already been done in the updateOneEntry function
  if (method !== "GET") {
    const body = JSON.parse(req.body);
    const set = {
      $set: {
        ...body,
      },
    };
    await updateOneEntry(req, res, "payments", set);
  } else {
    await findOne(req, res, "payments", { _id: ObjectId(id) });
  }
});
