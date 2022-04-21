import { authenticate } from "../authentication";
import { updateOneEntry } from "../crud/update";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { body } = verifyUser(req);
  const set = {
    $set: {
      ...body,
    },
  };
  await updateOneEntry(req, res, "managers", set);
});
