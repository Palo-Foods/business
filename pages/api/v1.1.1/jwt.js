import { sign } from "jsonwebtoken";
import { secret_key } from "../../../lib/secret";

export const createJwt = (payload) => {
  const claims = {
    ...payload,
  };

  const jwt = sign({ data: claims }, secret_key, {
    expiresIn: "8h",
  });
  return jwt;
};
