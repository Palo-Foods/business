import { compare } from "bcrypt";
import { decode, verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { secret_key } from "../../../../../../lib/secret";
import { connectToDatabase } from "../../../../../../lib/mongodb";
import { authenticate } from "../../../authentication";

export default authenticate(async (req, res, next) => {
  const {db} = await connectToDatabase()
  //1. check for method
  const method = req.method;
  // get api key
  const { authorization } = req.headers;
  const auth = authorization.substring(7);

  const { data } = verify(auth, secret_key);
  const { apiKey, id } = data;
  //get query params
  const { searchquery } = req.query;
  //get req body data
  try {
    if (method === "POST" && id !== undefined) {
      const response = await db
        .collection("users")
        .findOne({ _id: ObjectId(id) }, { projection: { apiKey: 1 } });

      //check to see if apiKey matches
      //decode token
      var decoded = decode(response.apiKey);
      //check to see if apiKey matches
      const match = compare(apiKey, decoded);

      if (match) {
        //get query
        const products = await db
          .collection("products")
          .find({ $text: { $search: searchquery } })
          .populate("category", "_id name")
          .populate("subcategory", "_id name")
          .populate("postedBy", "_id name");

        res
          .status(200)
          .json({ status: 200, statusText: "OK", data: { products } });
      } else {
        res.status(401).json({ status: 401, statusText: "Provide api key" });
      }
    } else {
      res.status(401).json({ status: 401, statusText: "Invalid method" });
    }
  } catch (error) {
    res.status(500).json({ status: 200, statusText: "Internal server error", error: error.message });
  }
});
