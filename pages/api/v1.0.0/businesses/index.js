import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { method, id, match } = verifyUser(req);
  if (method === "GET" && match) {
    await findAll(req, res, "businesses", { managerId: ObjectId(id) });
  }
});
