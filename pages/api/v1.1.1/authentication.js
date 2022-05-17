import { verify } from "jsonwebtoken";
import { statusCode401 } from "./status/codes";

export const authenticate = (fn) => async (req, res) => {
  const { authorization } = req.headers;
  //console.log(req.headers)
  const auth = authorization?.substring(7);
  verify(auth, process.env.NEXT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    statusCode401(res, "Sorry you are not authenticated");
  });
};
