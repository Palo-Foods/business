import { verify } from "jsonwebtoken";
import { secret_key } from "../../../lib/secret";

export const verifyUser = async (req) => {
  const authorization = req?.headers?.authorization;

  const auth = await authorization?.substring(7);

  const { data } = verify(auth, secret_key);

  const { userId, apiKey, email, role } = data;

  return {
    email,
    userId,
    apiKey,
    role,
  };
};
