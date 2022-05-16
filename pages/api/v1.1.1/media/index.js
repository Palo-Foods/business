import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findOne } from "../db/find";
import { get } from "../functions/get";
import {
  statusCode200,
  statusCode401,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../status/codes";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);
  console.log(role);
  const method = req.method;

  const collection = "media";

  try {
    //1. check if authorized to sign up, using match, role
    if (role !== "business") {
      statusCode401(res);
      return;
    }

    //2. check for method
    //if method does not exist
    if (method !== "GET") {
      statusCode405(res);
      return;
    }

    const projection = { projection: { media: 1 } };

    const results = await findOne(
      collection,
      { _id: ObjectId(userId) },
      projection
    );

    if (results === null) {
      return statusCode200(res, [], "OK");
    }

    if (results?._id) {
      return statusCode200(res, results?.media, "OK");
    } else {
      return statusCode404(res);
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
