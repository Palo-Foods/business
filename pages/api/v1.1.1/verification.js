import { verify } from "jsonwebtoken";
import { secret_key } from "../../../lib/secret";

export const verifyUser = async (req) => {
  const authorization = req?.headers?.authorization;

  const auth = await authorization?.substring(7);
  //console.log("auth", auth);

  const { data } = verify(auth, secret_key);
  //console.log("data", data);

  const { userId, apiKey, email, role } = data;
  //console.log("data", userId, apiKey, email, role);

  return {
    email,
    userId,
    apiKey,
    role,
  };
};
