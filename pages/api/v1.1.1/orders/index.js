import { authenticate } from "../authentication";
import {
  statusCode401,
  statusCode405,
  statusCode500,
} from "../status/codes";
import { verifyUser } from "../verification";

import Cors from "cors";
import { runMiddleware } from "../corsMiddleWare";
import { get } from "../functions/get";
import moment from "moment";

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
    const projection = {
      projection: { orders: 1, createdAt: moment().format("MMM Do YY") },
    }; //use date and time to insert orders

    await get(collection, userId, res, projection);
  } catch (error) {
    statusCode500(res, error);
  } finally {
    res.end();
  }
});
