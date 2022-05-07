import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { deleteOne } from "../crud/delete";
import { find } from "../crud/find";
import { updateOneEntry } from "../crud/update";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { id, method, email, apiKey } = await verifyUser(req);
  console.log("verification", id, method, email);

  try {
    //if managers doesn't get resolved, the id wont be passed, fix the apiKey issue
    const managers = await find(
      "managers",
      { email: email },
      { projection: { apiKey: 1 } }
    );

    console.log("managers", managers);

    const match = apiKey === managers?.data?.apiKey;

    console.log("match", match);
    if (match) {
      //2 check methods and execute accordingly
      if (method === "PUT") {
        const set = {
          $set: {
            ...body,
          },
        };
        //1 update user account with data
        const response = await updateOneEntry(req, "managers", set);

        const { status, statusText, data, error } = response;
        console.log("update response ", status, statusText, data, error);

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error,
        });
      } else if (method === "DELETE") {
        //delete account
        const response = await deleteOne("managers", id);

        const { status, statusText, data, error } = response;
        console.log("delete response ", status, statusText, data, error);

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error,
        });
      } else {
        //fetch account data
        const response = await findOne(req, "managers", {
          _id: ObjectId(id),
        });

        const { status, statusText, data, error } = response;

        console.log("fetch account ", status, statusText, data, error);

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
