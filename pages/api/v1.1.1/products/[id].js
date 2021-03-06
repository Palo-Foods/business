import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findOne } from "../db/find";
import {
  statusCode200,
  statusCode201,
  statusCode401,
  statusCode404,
  statusCode500,
} from "../status/codes";
import { insertToArray, removeFromArray } from "../db/update";
import { verifyUser } from "../verification";

import Cors from "cors";
import { runMiddleware } from "../corsMiddleWare";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "PUT", "DELETE", "HEAD"],
});

export default authenticate(async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  //verify user
  const { userId, role } = await verifyUser(req);

  const method = req.method;

  const { id } = req.query;
  //JSON.parse(JSON.parse(req.body))
  const body = JSON.parse(req.body);

  const collection = "products";

  try {
    //1. check if authorized to sign up, using match, role
    if (role !== "business") {
      statusCode401(res);
      return;
    }

    //2. check for method, if POST, GET, DELETE, PUT
    if (method === "GET") {
      //await get(collection, userId, res, id);
      const results = await findOne(collection, { _id: ObjectId(userId) });

      const product = results?.products?.find((id) => id === id);

      if (results?.id) {
        statusCode200(res, product);
      } else {
        statusCode404(res);
      }
    }

    if (method === "PUT") {
      const { name, price, discount, category, description, itemImage } = body;
      const data = {
        $set: {
          "products.$[elem].name": name,
          "products.$[elem].price": price,
          "products.$[elem].discount": discount,
          "products.$[elem].category": category,
          "products.$[elem].description": description,
          "products.$[elem].itemImage": itemImage,
        },
      };
      //5. update data in business collection
      const results = await insertToArray(
        collection,
        { _id: ObjectId(userId) },
        data,
        { arrayFilters: [{ "elem.id": id }] },
        {
          upsert: true,
        }
      );
      console.log("results", results);
      if (results.modifiedCount === 1) {
        statusCode201(res, "Product updated");
      } else {
        statusCode404(res);
      }
    }
    if (method === "DELETE") {
      const set = { $pull: { products: { id: id } } };

      //delete account
      const response = await removeFromArray(
        collection,
        {
          _id: ObjectId(userId),
        },
        set
      );
      if (response.matchedCount === 1) {
        statusCode200(res, [], "Deleted data");
      } else {
        statusCode404(res);
      }
    }
    //3. find all riders
  } catch (error) {
    statusCode500(res, error);
  } finally {
    res.end();
  }
});
