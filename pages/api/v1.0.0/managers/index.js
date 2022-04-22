import { compare } from "bcrypt";
import { decode } from "jsonwebtoken";
import { authenticate } from "../authentication";
import { findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { method } = await verifyUser(req);

  if (method === "GET") {
    await findAll(req, res, "managers");
  }
});
