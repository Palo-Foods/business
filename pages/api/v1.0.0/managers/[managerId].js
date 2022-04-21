import { authenticate } from "../authentication";
import { updateOneEntry } from "../crud/update";

export default authenticate(async (req, res) => {
  //dont set methods or anything, everything has already been done in the updateOneEntry function
  const body = JSON.parse(req.body);
  const set = {
    $set: {
      ...body,
    },
  };
  await updateOneEntry(req, res, "managers", set);
});
