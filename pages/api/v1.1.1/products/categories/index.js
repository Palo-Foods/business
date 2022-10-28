import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { authenticate } from "../../authentication";
import { verifyUser } from "../../verification";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const {method} = req

  try {
    switch (method) {
      case "GET":
        const {db} = await connectToDatabase()
       
        const filter = {
            '_id': new ObjectId(userId)
          };
          const projection = {
            'categories': {
              'id': 1, 
              'name': 1
            }
          };
        const result = await db.collection('products').findOne(filter, { projection });
          console.log(result)
        result?.categories?.length > 0 ? res.status(200).json(result.categories)
          : res.status(404).json([])
        break;
    
      default: res.status(400).json({msg: "Invalid method"})
        break;
    }
  } catch (error) {
    res.status(500).json({msg: error.message})
  } finally {
    res.end()
  }
});
