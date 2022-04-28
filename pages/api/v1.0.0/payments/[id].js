import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { deleteOne } from "../crud/delete";
import { updateOneEntry } from "../crud/update";

export default authenticate(async (req, res) => {
  const method = req.method;
  const { id } = req.query; //needed for condition
  try {
    //dont set methods or anything, everything has already been done in the updateOneEntry function
    if (method === "PUT") {
      const body = JSON.parse(req.body);
      const set = {
        $set: {
          ...body,
        },
      };

      const response = await updateOneEntry(req, "payments", set);

      const { status, statusText, data, error } = response;
      console.log("update response ", status, statusText, data, error);

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } else if (method === "DELETE") {
      const response = await deleteOne("payments", id);

      const { status, statusText, data, error } = response;
      console.log("update response ", status, statusText, data, error);

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } else {
      const response = await findOne(req, res, "payments", {
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
