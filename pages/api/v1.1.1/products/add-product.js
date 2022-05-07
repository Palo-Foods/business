import { authenticate } from "../authentication";
import moment from "moment";
import { verifyUser } from "../verification";
import { v4 as uuidv4 } from "uuid";
import {
  statusCode201,
  statusCode401,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../status/codes";
import { ObjectId } from "mongodb";
import { insertToArray } from "../db/update";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const collection = "products";

  const method = req.method;

  const body = JSON.parse(req.body);

  try {
    //1. check if authorized to sign up, using match, role
    if (role !== "business") {
      statusCode401(res);
      return;
    }

    //2. check for method
    //if method does not exist
    if (method !== "POST") {
      statusCode405(res);
      return;
    }

    const date = new Date();

    //create id for product
    const id = uuidv4();

    const item = {
      id,
      ...body,
      extras: [],
      rating: [],
      review: [],
      createdAt: moment(date).format("lll"),
    };

    const data = {
      $push: { products: item },
    };

    //5. insert data into company collection
    const response = await insertToArray(
      collection,
      { _id: ObjectId(userId) },
      data,
      { upsert: true }
    );
    console.log(response);
    if (response.matchedCount === 1) {
      statusCode201(res);
    } else {
      statusCode404(res, "Adding data failed");
    }
  } catch (error) {
    console.log(error.message);
    statusCode500(res, error);
  }
});
