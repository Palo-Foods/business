import { verify } from "jsonwebtoken";
import { find } from "./crud/find";
import { secret_key } from "../../../lib/secret";

export const verifyUser = async (req) => {
  const authorization = req?.headers?.authorization;

  const method = req?.method;

  const businessId = req?.query;

  const managerId = req?.query;

  const auth = await authorization?.substring(7);

  const { data } = verify(auth, secret_key);

  const { id, apiKey, email } = data;
  //console.log(id, apiKey, email);
  //if admin doesn't get resolved, the id wont be passed, fix the apiKey issue
  const admin = await find(
    "admins",
    { email: email },
    { projection: { password: 0, createdAt: 0 } }
  );

  const match = apiKey === admin.apiKey;

  console.log("match1", match);
  console.log("method2", method);

  return {
    method,
    body: req.body && JSON.parse(req?.body),
    match,
    id,
    apiKey,
    businessId,
    managerId,
  };
};
