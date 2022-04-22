import { authenticate } from "../authentication";
import { findAll } from "../crud/find";

export default authenticate(async (req, res) => {
  //const { id } = verifyUser(req);

  //comes with a condition (admin)
  //await findAll(req, res, "orders", { managerId: ObjectId(id) });
  //await findAll(req, res, "orders", { businessId: ObjectId(id) });

  //comes with no condition (admin)
  await findAll(req, res, "orders");
});
