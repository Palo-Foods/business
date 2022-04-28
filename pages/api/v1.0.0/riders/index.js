import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { id, method } = await verifyUser(req);
  console.log("verification", id, method);

  //comes with a condition (admin)
  //await findAll(req, res, "riders", { managerId: ObjectId(id) });
  try {
    if (method === "GET") {
      //comes with a condition (manager)
      const response = await findAll(
        req,
        "riders",
        { managerId: id },
        {
          projection: {
            name: 1,
            email: 1,
            fullName: 1,
            phone: 1,
            region: 1,
            type: 1,
          },
        },
        {}
      );

      const { status, statusText, data, error } = response;
      console.log("find response", status, statusText, data, error);

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    } else {
      console.log("error", error.message);
      res.status(405).json({
        status: 405,
        statusText: "Invalid method",
        error: error.message,
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
