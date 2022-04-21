import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { role, match, id } = verifyUser(req);
  if (role === "manager" && match) {
    await findAll(req, res, "orders", { _id: ObjectId(id) });
  }
});
