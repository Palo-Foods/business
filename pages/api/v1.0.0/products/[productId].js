import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { deleteOne } from "../crud/delete";
import { updateOneEntry } from "../crud/update";

export default authenticate(async (req, res) => {
  const method = req.method;
  const { id } = req.query; //needed for condition
  //dont set methods or anything, everything has already been done in the updateOneEntry function
  if (method === "PUT") {
    const body = JSON.parse(req.body);
    const set = {
      $set: {
        ...body,
      },
    };
    try {
      const response = await updateOneEntry(req, res, "products", set);

      const { status, statusText, data, error } = response;

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        statusText: "Internal server error",
        error: error.message,
      });
    }
  } else if (method === "DELETE") {
    try {
      const response = await deleteOne("products", id);

      const { status, statusText, data, error } = response;

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        statusText: "Internal server error",
        error: error.message,
      });
    }
  } else {
    try {
      const response = await findOne(req, res, "products", {
        _id: ObjectId(id),
      });

      const { status, statusText, data, error } = response;

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        statusText: "Internal server error",
        error: error.message,
      });
    }
  }
});
