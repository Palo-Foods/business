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
import { connectToDatabase } from "../../../../../lib/mongodb";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const method = req.method;

  const { productId } = JSON.parse(req.body);

  const collection = "products";

  try {
    const {db} = await connectToDatabase()
     switch (method) {
      case "GET":
        const {db} = await connectToDatabase()
         const products = await db.collection("products")
           .findOne({ _id: ObjectId(userId) }, { projection: { extras: 1 } }).toArray()
        products?._id ? res.status(200).json(products?.extras)
          : res.status(404).json([])
        break;
    
      default: res.status(400).json({msg: "Invalid method"})
        break;
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
