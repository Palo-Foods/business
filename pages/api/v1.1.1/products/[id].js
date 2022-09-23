import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { verifyUser } from "../verification";

import Cors from "cors";
import { runMiddleware } from "../corsMiddleWare";
import { connectToDatabase } from "../../../../lib/mongodb";

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

  const data = JSON.parse(body);

  try {
    const { db } = await connectToDatabase()
    
    switch (method) {
      case "GET":
        const product = await db.collection("products").findOne({ _id: ObjectId(userId), "products.id": id })
        res.status(200).json(product)
        break;
      
      case "PUT":
        const { name, price, discount, category, description, image } = data;
        const updateData = {
          $set: {
            "products.$[elem].name": name,
            "products.$[elem].price": price,
            "products.$[elem].discount": discount,
            "products.$[elem].category": category,
            "products.$[elem].description": description,
            "products.$[elem].image": image,
          },
        };
        //5. update data in business collection
        const results = await db.collection("products").updateOne(
          { _id: ObjectId(userId) },
          updateData,
          { arrayFilters: [{ "elem.id": id }] },
          {upsert: true}
        );
        results.modifiedCount ? res.status(200).json({ msg: "Product updated" })
          : res.status(404).json({ msg: "Product update failed" });
        break;
        
      case "DELETE":
        const deleteProduct = await db.collection("products")
          .updateOne({ _id: ObjectId(userId) }, { $pull: { products: { id: id } } })
        
        deleteProduct.matchedCount ? res.status(200).json({ msg: "Product deleted" })
          : res.status(404).json({msg: "Product deletion failed" })
        break
      
      default: res.status(400).json({ msg: "Invalid method"})
        break;
    }

  } catch (error) {
    res.status(500).json({ msg: error.message})
  } finally {
    res.end();
  }
});
