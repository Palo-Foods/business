import { ObjectId } from "mongodb";
import { addToArray } from "../../crud/update";

export default async function handler(req, res) {
  const { method, body, match } = verifyUser(req);

  const productId = req.query;

  const extraId = uuidv4();

  try {
    if (method !== "POST" && match) {
      res.json({
        status: 404,
        statusText: "Invalid method",
      });

      return;
    }

    const set = {
      $push: {
        extras: { id: extraId, ...body },
      },
    };

    const response = await addToArray(
      "ratings",
      { _id: ObjectId(productId) },
      set,
      {
        upsert: true,
      }
    );

    response &&
      res.json({
        status: 201,
        statusText: "You have successfully added a rating",
      });

    res.json({ status: 400, statusText: "Adding rating failed" });
  } catch (error) {
    res.json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
}
