import { ObjectId } from "mongodb";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { role, method, body } = verifyUser(req);

  const date = new Date();

  if (method === "POST" && role !== "business") {
    const item = {
      ...body,
      extras: [],
      rating: [],
      review: [],
      createdAt: moment(date).format("lll"),
    };

    const set = {
      $push: { products: item },
    };

    const response = await insertOne(
      req,
      res,
      "products",
      { _id: ObjectId(id) },
      set
    );

    response &&
      res.json({
        status: 201,
        statusText: "You have successfully added a product",
      });

    res.json({ status: 400, statusText: "Adding product failed" });
  } else {
    res
      .status(404)
      .json({ status: 404, statusText: "Bad request method/missing data" });
  }
});
