import { authenticate } from "../authentication";
import { get } from "../functions/get";
import { statusCode401, statusCode405, statusCode500 } from "../status/codes";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

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
    if (method !== "GET") {
      statusCode405(res);
      return;
    }

    const projection = { projection: { products: 1 } };

    await get(collection, userId, res, projection);
  } catch (error) {
    statusCode500(res, error);
  }
});
