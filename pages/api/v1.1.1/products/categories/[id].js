import { ObjectId } from "mongodb";
import { authenticate } from "../../authentication";
import { verifyUser } from "../../verification";

import Cors from "cors";
import { runMiddleware } from "../../corsMiddleWare";
import { connectToDatabase } from "../../../../../lib/mongodb";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "PUT", "DELETE", "HEAD"],
});

export default authenticate(async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  //verify user
  const { userId, role } = await verifyUser(req);
  const {query, body, method} = req

  const { id } = query;


  try {
    const { db } = await connectToDatabase()
    
    switch (method) {
      case "GET":
        const filter = {
          'categories.id': id
        };

        const projection = {
          'categories.$': 1
        };
        const extra = await db.collection("products")
          .findOne(filter, { projection })
        
        res.status(200).json(extra)
        break;
      
      case "PUT":
        const data = JSON.parse(body);
        const { name } = data;
        const updateData = {
          $set: {
            "categories.$[elem].name": name
          },
        };
        //5. update data in business collection
        const results = await db.collection("products").updateOne(
          { _id: ObjectId(userId) },
          updateData,
          { arrayFilters: [{ "elem.id": id }] },
          {upsert: true}
        );
        results.modifiedCount ? res.status(200).json({ msg: "Category updated" })
          : res.status(404).json({ msg: "Extra update failed" });
        break;
        
      case "DELETE":
        const deleteProduct = await db.collection("products")
          .updateOne({ _id: ObjectId(userId) }, { $pull: { categories: { id: id } } })
        
        deleteProduct.matchedCount ? res.status(200).json({ msg: "Category deleted" })
          : res.status(404).json({msg: "Category deletion failed" })
        break
      
      default: res.status(400).json({ msg: "Invaid method"})
        break;
    }

  } catch (error) {
    res.status(500).json({ msg: error.message})
  } finally {
    res.end();
  }
});
