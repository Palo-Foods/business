import { authenticate } from "../authentication";
import { findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { role } = verifyUser(req);
  if (role !== "business") {
    await findAll(req, res, "payments", { managerId });
  }
});
