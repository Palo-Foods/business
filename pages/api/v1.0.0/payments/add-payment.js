import { ObjectId } from "mongodb";
import { verifyUser } from "../verification";
import moment from "moment";

export default authenticate(async (req, res) => {
  const { role, method, body } = verifyUser(req);

  const date = new Date();

  if (method === "POST" && role !== "business") {
    const item = {
      ...body,
      createdAt: moment(date).format("lll"),
    };

    const set = {
      $push: { payments: item },
    };

    const response = await insertOne(
      req,
      res,
      "payments",
      { _id: ObjectId(id) },
      set
    );

    response &&
      res.json({
        status: 201,
        statusText: "You have successfully added a payment",
      });

    res.json({ status: 400, statusText: "Adding payment failed" });
  } else {
    res
      .status(404)
      .json({ status: 404, statusText: "Bad request method/missing data" });
  }
});
