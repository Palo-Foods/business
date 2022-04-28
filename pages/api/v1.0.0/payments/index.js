import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { id, method } = await verifyUser(req);
 console.log("method 2", method);
  try {
    if (method === "GET") {
      //comes with a condition (manager)
      const response = await findAll(req, "payments", { managerId: id }, {});

      const { status, statusText, data, error } = response;
      console.log("find response", status, statusText, data, error);

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } else {
      res.status(405).json({
        status: 405,
        statusText: "Invalid method",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal Server Error",
      error: error.message,
    });
  }
});
