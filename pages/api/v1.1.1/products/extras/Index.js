import { authenticate } from "../../authentication";
import { verifyUser } from "../../verification";
import {
  statusCode200,
  statusCode401,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../../status/codes";
import { ObjectId } from "mongodb";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const method = req.method;

  const { productId } = JSON.parse(req.body);

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
      console.log("productId", productId);
      //await get(collection, userId, res, id);
      const results = await findOne(collection, { _id: ObjectId(userId) });

      //get product
      const product = results?.products?.find((id) => id === productId);
      console.log("extras", product);
      if (product?.id) {
        statusCode200(res, product?.extras);
      } else {
        statusCode404(res);
      }
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
