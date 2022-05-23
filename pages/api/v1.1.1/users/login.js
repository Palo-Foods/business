import { login } from "../functions/login";
import { statusCode500 } from "../status/codes";
import Cors from "cors";
import { runMiddleware } from "../corsMiddleWare";

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST", "HEAD"],
});

export default async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  try {
    await login(req, res);
  } catch (error) {
    statusCode500(res, error);
  } finally {
    res.end();
  }
};
