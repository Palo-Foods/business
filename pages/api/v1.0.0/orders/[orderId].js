import { updateOneEntry } from "../crud/update";
import { verifyUser } from "./verification";

export default authenticate(async (req, res) => {
  const body = JSON.parse(req.body);
  const set = {
    $set: {
      ...body,
    },
  };
  await updateOneEntry(req, res, "payments", set);
});
