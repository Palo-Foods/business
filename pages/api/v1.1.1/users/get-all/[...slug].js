import { authenticate } from "../../authentication";
import { findAll } from "../../db/find";
import {
  statusCode200,
  statusCode401,
  statusCode405,
  statusCode500,
} from "../../status/codes";
import { verifyUser } from "../../verification";
import Cors from "cors";
import { runMiddleware } from "../../corsMiddleWare";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
  origin: ["*"],
});

export default authenticate(async (req, res) => {
  const { slug } = req.query;
  console.log("slug", slug)

  const collection = slug[0];

  //verify user
  const { role, userId } = await verifyUser(req);

  const method = req.method;
  // Run the middleware
  await runMiddleware(req, res, cors);
  //res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("verifying ", role, userId);
  try {
    //1. check if authorized to sign up, using match, role
    if (role !== "manager") {
      statusCode401(res);
      return;
    }

    //2. check for method
    //if method does not exist
    if (method !== "GET") {
      statusCode405(res);
      return;
    }

    const condition =
      role === "admin" ? { adminId: userId } : { managerId: userId };
    console.log("condition", condition);

    //3. find all riders
    const results = await findAll(collection, condition, {
      projection: {
        createdAt: 0,
        password: 0,
        apiKey: 0,
      },
    });
    console.log(results);
    statusCode200(res, results, "OK");
  } catch (error) {
    statusCode500(res, error);
  }
});