import { verify } from "jsonwebtoken";
import { find } from "./crud/find";
import { secret_key } from "../../../lib/secret";

export const verifyUser = async (req) => {
  const authorization = req?.headers?.authorization;

  const method = req?.method;
  //console.log("method veri", method)

  const businessId = req?.query;

  const managerId = req?.query;

  const auth = await authorization?.substring(7);
  //console.log("auth", auth);

  const { data } = verify(auth, secret_key);
  //console.log("data", data);

  const { id, apiKey, email, role } = data;
  //console.log("data", id, apiKey, email, role);

  return {
    method,
    email,
    body: req.body && JSON.parse(req?.body),
    id,
    apiKey,
    businessId,
    managerId,
  };
};
