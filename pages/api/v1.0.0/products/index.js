import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findOne } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  //const { id } = verifyUser(req);

  //comes with a condition (admin)
  //await findAll(req, res, "products", { businessId: ObjectId(id) });

  //comes with no condition (admin)
  await findAll(req, res, "products");
});
