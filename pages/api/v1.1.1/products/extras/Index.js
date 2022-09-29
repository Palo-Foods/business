import { authenticate } from "../../authentication";
import { verifyUser } from "../../verification";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../lib/mongodb";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const method = req.method;

  try {
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
    res.status(500).json({msg: error.message})
  }
});
