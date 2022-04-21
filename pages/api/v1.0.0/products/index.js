import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findOne } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { role, id, match } = verifyUser(req);
  if (role !== "business" && match) {
    await findOne(
      req,
      res,
      "products",
      { _id: ObjectId(id) },
      { projection: { products: 1 } }
    );
  }
});
