import { ObjectId } from "mongodb";
import { addToArray } from "../../crud/update";

export default async function handler(req, res) {
  const { method, body, match } = verifyUser(req);

  const projectId = req.query;

  try {
    if (method !== "POST" && match) {
      res.json({
        status: 404,
        statusText: "Invalid method",
      });

      return;
    }

    if (method !== "DELETE" && match) {
      //pull to reviews
      const set = {
        $pull: { extras: { extraId: body?.extraId } },
      };

      const response = await removeFromArray(
        "ratings",
        { _id: ObjectId(projectId) },
        set
      );

      response &&
        res.json({
          status: 201,
          statusText: "You have successfully removed a task",
        });

      res.json({ status: 400, statusText: "Adding task failed" });
    } else if (method !== "PUT" && match) {
      const set = {
        $push: {
          extras: { id: extraId, ...body },
        },
      };

      const response = await addToArray(
        "ratings",
        { _id: ObjectId(projectId) },
        set
      );

      response &&
        res.json({
          status: 200,
          statusText: "You have successfully edited a rating",
        });

      res.json({ status: 400, statusText: "Adding rating failed" });
    }
  } catch (error) {
    res.json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
}
