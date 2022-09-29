import { authenticate } from "../../authentication";
import { verifyUser } from "../../verification";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../lib/mongodb";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const { body, method } = req
  
  const data = JSON.parse(body); //user-name, rate

  try {
    switch (method) {
      case "PUT":
        const { db } = await connectToDatabase()

        const id = uuidv4();

        const addRate = await db.collection("products")
          .updateOne({ _id: ObjectId(userId) }, { $push: { rates: {id, ...data} } }, { upsert: true })
        
        addRate.matchedCount ? res.status(201).json({ msg: "Extra added successfully" })
          : res.status(404).json({ msg: "Adding extra failed" }); 
        break;
    
      default:
        break;
    }
  } catch (error) {
    res.status(500).json({ msg: error.message})
  } finally {
    res.end();
  }
});
