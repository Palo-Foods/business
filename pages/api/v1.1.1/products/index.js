import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";
import { authenticate } from "../authentication";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const {method} = req

  try {
    switch (method) {
      case "GET":
        const {db} = await connectToDatabase()
        const products = await db.collection("products").find({_id: ObjectId(userId)}, {projection: {products: 1}}).toArray()
        products._id ? res.status(200).json(products?.products)
          : res.status(404).json([])
        break;
    
      default: res.status(400).json({msg: "Invalid method"})
        break;
    }
  } catch (error) {
    res.status(500).json({msg: "Invalid method"})
  } finally {
    res.end()
  }
});
