import { verify } from "jsonwebtoken";

export const authenticate = (fn) => async (req, res) => {
  const { authorization } = req.headers;
  const auth = authorization?.substring(7);
  verify(auth, process.env.NEXT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    re.status(400).json({msg: "Sorry you are not authenticated"})
  });
};
