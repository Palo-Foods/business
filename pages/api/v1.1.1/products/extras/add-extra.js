import { authenticate } from "../../authentication";
import { verifyUser } from "../../verification";
import { v4 as uuidv4 } from "uuid";
import {
  statusCode201,
  statusCode401,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../../status/codes";
import { insertToArray } from "../../db/update";
import { ObjectId } from "mongodb";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const body = JSON.parse(req.body); //JSON.parse(JSON.parse(req.body));

  const method = req.method;

  const collection = "products";

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

    //create id for product
    const id = uuidv4();

    const { name, price, productId } = body;
    //push to extras
    const set = {
      $push: {
        "products.$[elem].extras": { id, name, price },
      },
    };

    const results = await insertToArray(
      collection,
      { _id: ObjectId(userId) },
      set,
      { arrayFilters: [{ "elem.id": productId }] },
      {
        returnDocuments: true,
        upsert: true,
      }
    );

    if (results.matchedCount === 1) {
      statusCode201(res, results);
    } else {
      statusCode404(res, "Adding data failed");
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
