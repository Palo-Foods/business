import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { deleteOne } from "../crud/delete";
import { updateOneEntry } from "../crud/update";

export default authenticate(async (req, res) => {
  const method = req.method;
  const { id } = req.query; //needed for condition
  //dont set methods or anything, everything has already been done in the updateOneEntry function
  if (method === "PUT") {
    const body = JSON.parse(req.body);
    const set = {
      $set: {
        ...body,
      },
    };
    await updateOneEntry(req, res, "admins", set);
  } else if (method === "DELETE") {
    await deleteOne(res, "admins", id);
  } else {
    await findOne(req, res, "admins", { _id: ObjectId(id) });
  }
});
