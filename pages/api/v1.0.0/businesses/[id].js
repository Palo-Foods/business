import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { deleteOne } from "../crud/delete";
import { find } from "../crud/find";
import { updateOneEntry } from "../crud/update";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { method, email, apiKey, body } = await verifyUser(req);
  const { id } = req.query;

  //console.log("verification", id, method, email);

  try {
    //if businesses doesn't get resolved, the id wont be passed, fix the apiKey issue
    const manager = await find(
      "managers",
      { email: email },
      { projection: { apiKey: 1 } }
    );

    //console.log("manager", manager);

    const match = apiKey === manager?.data?.apiKey;

    //console.log("match", match);
    if (match) {
      //dont set methods or anything, everything has already been done in the updateOneEntry function
      if (method === "PUT") {
        console.log("method to use", req.method);
        console.log("body", body);
        const set = {
          $set: {
            ...body,
          },
        };

        const response = await updateOneEntry("businesses", id, set);

        const { status, statusText, data, error } = response;
        //console.log("update response ", status, statusText, data, error);

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error,
        });
      } else if (method === "DELETE") {
        console.log("method to use", req.method);
        const response = await deleteOne("businesses", id);

        const { status, statusText, data, error } = response;
        console.log("update response ", status, statusText, data, error);

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error,
        });
      } else {
        console.log("method to use", req.method);
        const response = await findOne("businesses", {
          _id: ObjectId(id),
        });

        const { status, statusText, data, error } = response;
        console.log("delete response ", status, statusText, data, error);

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
