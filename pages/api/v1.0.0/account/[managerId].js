import { updateOne } from "../crud/update";
import { verifyUser } from "./verification";

export default authenticate(async (req, res) => {
  const { body } = verifyUser(req);
  const set = {
    $set: {
      ...body,
    },
  };
  await updateOne(req, res, "managers", set);
});
