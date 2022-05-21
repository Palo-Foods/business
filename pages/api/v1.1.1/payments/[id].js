import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { find } from "../db/find";
import {
  statusCode200,
  statusCode401,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../status/codes";
import { insertToArray } from "../db/update";
import { verifyUser } from "../verification";

import Cors from "cors";
import { runMiddleware } from "../corsMiddleWare";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "PUT", "POST", "HEAD"],
});

export default authenticate(async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  //verify user
  const { userId, role } = await verifyUser(req);

  const method = req.method;

  const { id } = req.query;

  const collection = "orders";

  const condition = {_id: ObjectId(userId), "orders.orderId": id }

  try {
    //1. check if authorized to sign up, using match, role
    if (role !== "business") {
      statusCode401(res);
      return;
    }

    if (method === "POST") {
      statusCode405(res);
      return;
    }

    if (method === "GET") {
      const results = await findOne(collection, condition, {});
      if (results?.orderId) {
        statusCode200(res, results);
      } else {
        statusCode404(res);
      }
    }

    if (method === "PUT") {
      const data = {
        $set: {
          "orders.$[elem].orderStatus": action,
        },
      };

      const results = await insertToArray(
        collection,
        { _id: ObjectId(userId) },
        data,
        { arrayFilters: [{ "elem.orderId": id }] },
        {
          upsert: true,
        }
      );

      if (results.matchedCount === 1) {
        statusCode200(res);
      } else {
        statusCode404(res);
      }
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
