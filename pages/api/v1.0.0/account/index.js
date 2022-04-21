import { findOne } from "../crud/find";

export default authenticate(async (req, res) => {
  await findOne(req, res, "managers");
});
