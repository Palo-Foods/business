import { sign } from "jsonwebtoken";
import { secret_key } from "../../../lib/secret";

export const createJwt = (payload) => {
  const claims = {
    id: payload._id,
    role: payload.role,
    apiKey: payload.apiKey,
    email: payload.email,
  };

  const jwt = sign({ data: claims }, secret_key, {
    expiresIn: "4h",
  });
  return jwt;
};
