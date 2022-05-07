import { connectToDatabase } from "../../../../lib/mongodb";
import { secret_key } from "../../../../lib/secret";
import { authenticate } from "../authentication";
import { ObjectId } from "mongodb";
import { decode, verify } from "jsonwebtoken";
import { compare } from "bcrypt";

export default authenticate(async (req, res, next) => {
  const { db } = await connectToDatabase();
  //1. get method
  const method = req.method;
  // get api key
  const { authorization } = req.headers;
  const auth = authorization.substring(7);

  const { data } = verify(auth, secret_key);
  const { apiKey, id } = data;

  try {
    if (method === "GET") {
      const response = await db
        .collection("shop")
        .findOne({ _id: ObjectId(id) }, { projection: { apiKey: 1 } });

      //check to see if apiKey matches
      //decode token
      var decoded = decode(response.apiKey);
      //check to see if apiKey matches
      const match = compare(apiKey, decoded);

      if (match) {
        //get orders
        const media = await db
          .collection("media")
          .find()
          .sort({ createdAt: 1 })
          .toArray();

        //get products that has been purchased more

        res
          .status(200)
          .json({ status: 200, statusText: "OK", data: { media } });
      } else {
        res.status(401).json({ status: 200, statusText: "Provide api key" });
      }
    } else {
      //invalid method call
      res.status(401).json({ status: 200, statusText: "Invalid method" });
    }
  } catch (error) {
    //server error
    res.status(500).json({
      status: 200,
      statusText: "Internal server error",
      error: error.message,
    });
  }
});
