import { authenticate } from "../authentication";
import { findOne } from "../crud/find";

export default authenticate(async (req, res) => {
  await findOne(req, res, "admin");
});
