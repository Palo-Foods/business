import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { id } = verifyUser(req);

  try {
    //comes with a condition (manager)
    const response = await findAll(
      req,
      "orders",
      { managerId: id },
      {
        projection: {},
      }
    );

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
      statusText: "Internal Server Error",
      error: error.message,
    });
  }
});
