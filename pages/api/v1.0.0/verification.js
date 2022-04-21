import { decode, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import { find } from "./crud/find";
import { secret_key } from "../../../lib/secret";

export const verifyUser = async (req) => {
  //1. check for method
  const method = req?.method;

  const { adminId } = req?.query;
  //get req body data
  const body = JSON.parse(req?.body);

  // get api key
  const { authorization } = req?.headers;
  const auth = authorization?.substring(7);

  const { data } = verify(auth, secret_key);
  const { apiKey, id, role } = data;

  const condition = { email: body?.email };

  const admin = await find("admins", condition);

  const decoded = decode(admin?.apiKey);

  const match = compare(apiKey, decoded);

  return { method, body, id, role, match, adminId };
};
