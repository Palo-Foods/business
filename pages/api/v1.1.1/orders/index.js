import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { find, findAll } from "../db/find";
import {
  statusCode200,
  statusCode401,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../status/codes";
import { verifyUser } from "../verification";

import Cors from "cors";
import { runMiddleware } from "../corsMiddleWare";
import { get } from "../functions/get";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default authenticate(async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  //verify user
  const { userId, role } = await verifyUser(req);

  const method = req.method;

  const collection = "orders";

  try {
    //1. check if authorized to sign up, using match, role
    if (role !== ("business" || "manager")) {
      statusCode401(res);
      return;
    }

    //get riders
    if (method !== "GET") {
      statusCode405(res);
      return;
    }

    //3. find all riders
    const projection = { projection: { orders: 1 } };

    await get(collection, userId, res, projection);

    if (results?.length >= 0) {
      statusCode200(res, results, "OK");
    } else {
      statusCode404(res);
    }
  } catch (err) {
    statusCode500(res, error);
  }
});
