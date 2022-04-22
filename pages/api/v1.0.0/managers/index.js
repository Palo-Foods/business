import { authenticate } from "../authentication";
import { findAll } from "../crud/find";

export default authenticate(async (req, res) => {
  await findAll(req, res, "managers");
});
