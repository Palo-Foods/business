import { verify } from "jsonwebtoken";

export const authenticate = (fn) => async (req, res) => {
  const { authorization } = req.headers;
  //console.log(req.headers)
  const auth = authorization?.substring(7);
  verify(auth, process.env.NEXT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res
      .status(401)
      .json({ status: 401, statusText: "Sorry you are not authenticated" });
  });
};
