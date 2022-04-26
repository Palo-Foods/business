import { authenticate } from "../authentication";
import { findAll } from "../crud/find";

export default authenticate(async (req, res) => {
  //comes with no condition (admin)
  await findAll(
    req,
    res,
    "managers",
    {},
    {
      projection: {
        email: 1,
        phone: 1,
        location: 1,
        region: 1,
        fullName: 1,
      },
    }
  );
});
