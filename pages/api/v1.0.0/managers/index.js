import { authenticate } from "../authentication";
import { findAll } from "../crud/find";

export default authenticate(async (req, res) => {
  //comes with no condition (admin)
  await findAll(req, res, "managers");
});
