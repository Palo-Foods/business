import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { deleteOne } from "../crud/delete";
import { find } from "../crud/find";
import { updateOneEntry } from "../crud/update";

export default authenticate(async (req, res) => {
  const { method, email, apiKey , body} = await verifyUser(req);
  const { id } = req.query;
  console.log("verification", id, method, email);

  try {
    //if businesses doesn't get resolved, the id wont be passed, fix the apiKey issue
    const manager = await find(
      "managers",
      { email: email },
      { projection: { apiKey: 1 } }
    );

    console.log("manager", manager);

    const match = apiKey === manager?.data?.apiKey;

    console.log("match", match);
    if (match) {
      //dont set methods or anything, everything has already been done in the updateOneEntry function
      if (method === "PUT") {
        const body = JSON.parse(req.body);
        const set = {
          $set: {
            ...body,
          },
        };

        const response = await updateOneEntry("orders", id, set);

        const { status, statusText, data, error } = response;

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error,
        });
      } else if (method === "DELETE") {
        const response = await deleteOne("orders", id);

        const { status, statusText, data, error } = response;

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error,
        });
      } else {
        const response = await findOne("orders", {
          _id: id,
        });

        const { status, statusText, data, error } = response;

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error,
        });
      }
    } else {
      console.log("401");
      res.status(401).json({
        status: 401,
        statusText: "not authenticated",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
});
