import { authenticate } from "../authentication";
import { verifyUser } from "../verification";

import Cors from "cors";
import { runMiddleware } from "../corsMiddleWare";
import { connectToDatabase } from "../../../../lib/mongodb";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default authenticate(async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  //verify user
  const { userId } = await verifyUser(req);

  const {method} = req

  try {
    switch (method) {
      case "GET":
        const { db } = await connectToDatabase()
        const order = await db.collection("orders").findOne({ restaurantId: userId })
        order?._id > 0 ? res.status(200).json(order) : res.status(404).json({})
        break;
    
      default: res.status(400).json({msg: "Invalid method"}) 
        break;
    }
  } catch (error) {
    res.status(500).json({msg: error.message})
  } finally {
    res.end();
  }
});