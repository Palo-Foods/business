import { authenticate } from "../../authentication";
import { verifyUser } from "../../verification";
import {
  statusCode200,
  statusCode201,
  statusCode401,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../../status/codes";
import { insertToArray, removeFromArray } from "../../db/update";
import { ObjectId } from "mongodb";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const method = req.method;

  const { id } = req.query;

  const { productId, name, price, category, subCategory } = JSON.parse(
    req.body
  );

  const collection = "products";

  try {
    //1. check if authorized to sign up, using match, role
    if (role !== "business") {
      statusCode401(res);
      return;
    }

    //2. check for method
    //if method does not exist
    if (method === "POST") {
      statusCode405(res);
      return;
    }

    //2. check for method, if POST, GET, DELETE, PUT
    if (method === "GET") {
      //await get(collection, userId, res, id);
      const results = await findOne(collection, { _id: ObjectId(userId) });

      //get product
      const product = results?.products?.find((id) => id === productId);

      //get extra
      const extra = product?.extras?.find((id) => id === id);

      if (extra?._id) {
        statusCode200(res, extra);
      } else {
        statusCode404(res);
      }
    }

    if (method !== "DELETE") {
      //push to extras
      const data = {
        $pull: { "products.$[elem].extras": { id: id } },
      };

      //delete account
      const response = await removeFromArray(
        collection,
        {
          _id: ObjectId(userId),
        },
        data,
        { arrayFilters: [{ "elem.id": productId }] }
      );

      if (response.deletedCount === 1) {
        statusCode200(res);
      } else {
        statusCode404(res);
      }
    }
    if (method !== "PUT") {
      //edit extra details
      const set = {
        $set: {
          "extras.$[elem].name": name,
          "extras.$[elem].price": price,
          "extras.$[elem].category": category,
          "extras.$[elem].subCategory": subCategory,
        },
      };

      const response = await insertToArray(
        collection,
        { _id: ObjectId(userId) },
        set,
        { arrayFilters: [{ "elem.id": productId }] },
        {
          upsert: true,
        }
      );

      if (response.matchedCount === 1) {
        statusCode201(res, results);
      } else {
        statusCode404(res, "Adding data failed");
      }
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
