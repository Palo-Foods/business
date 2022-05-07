import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { find, findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { id, method, email, apiKey } = await verifyUser(req);
  console.log("verification", id, method, email);
  try {
    //if payments doesn't get resolved, the id wont be passed, fix the apiKey issue
    const manager = await find(
      "payments",
      { email: email },
      { projection: { apiKey: 1 } }
    );

    console.log("manager", manager);

    const match = apiKey === manager?.data?.apiKey;

    console.log("match", match);
    if (match) {
      if (method === "GET") {
        //comes with a condition (manager)
        const response = await findAll("payments", { managerId: id }, {});

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
      statusText: "Internal Server Error",
      error: error.message,
    });
  }
});
