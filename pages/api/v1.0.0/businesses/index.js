import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  //const { id } = verifyUser(req);

  //comes with a condition (admin)
  //await findAll(req, res, "businesses", { managerId: ObjectId(id) });

  //comes with a condition (manager)
  await findAll(req, res, "businesses");
});
