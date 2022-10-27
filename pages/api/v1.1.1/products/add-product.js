import { authenticate } from "../authentication";
import moment from "moment";
import { verifyUser } from "../verification";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const {body, method} = req

  const data = JSON.parse(body);

  try {
    switch (method) {
      case "POST":
        //connect to database
        const {db} = await connectToDatabase()
        const date = new Date();

        //create id for product
        const id = uuidv4();

        const item = {
          id,
          ...data,
          extras: [],
          rating: [],
          review: [],
          createdAt: moment(date).format("lll"),
        };

        const response = await db.collection("products")
          .updateOne({ _id: ObjectId(userId) }, { $push: { products: item } }, { upsert: true })
        console.log(response)
        response.acknowledged ? res.status(201).json({ msg: "Product added successfully" })
          : res.status(404).json({ msg: "Adding product failed" }); 
        break;
    
      default: res.status(400).json({ msg: "Invalid method" });
        break;
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  } finally {
    res.end();
  }
});
