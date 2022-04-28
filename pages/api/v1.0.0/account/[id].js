import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { deleteOne } from "../crud/delete";
import { updateOneEntry } from "../crud/update";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  try {
    //1. verify if user has the right to edit account
    const { match, method, body } = await verifyUser(req);

    console.log("match: ", match);

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
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
});
