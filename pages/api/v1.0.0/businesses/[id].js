import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { deleteOne } from "../crud/delete";
import { updateOneEntry } from "../crud/update";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
   const { method, body } = await verifyUser(req);
  const { id } = req.query; //needed for condition
  try {
    //dont set methods or anything, everything has already been done in the updateOneEntry function
    if (method === "PUT") {
      const set = {
        $set: {
          ...body,
        },
      };

      const response = await updateOneEntry(req, "businesses", set);

      const { status, statusText, data, error } = response;
      console.log("update response ", status, statusText, data, error);

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } else if (method === "DELETE") {
      const response = await deleteOne(req, "businesses", id);

      const { status, statusText, data, error } = response;
      console.log("update response ", status, statusText, data, error);

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } else {
      const response = await findOne(req, res, "businesses", {
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
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
});
