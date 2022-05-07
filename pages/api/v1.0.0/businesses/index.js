import { ObjectId } from "mongodb";
import { authenticate } from "../authentication";
import { find, findAll } from "../crud/find";
import { verifyUser } from "../verification";

export default authenticate(async (req, res) => {
  const { id, method, email, apiKey } = await verifyUser(req);
  //console.log("verification", id, method, email);

  //comes with a condition (admin)
  //await findAll(req, res, "businesses", { businessId: ObjectId(id) });
  try {
    //if business doesn't get resolved, the id wont be passed, fix the apiKey issue
    const manager = await find(
      "managers",
      { email: email },
      { projection: { apiKey: 1 } }
    );

    //console.log("manager", manager);

    const match = apiKey === manager?.data?.apiKey;

    //console.log("match", match);
    if (match) {
      if (method === "GET" && match) {
        //console.log("start");
        //comes with a condition (business)
        const response = await findAll(
          "businesses",
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
        //console.log("response", response);
        const { status, statusText, data, error } = response;
        //console.log("find response", status, statusText, data, error);

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error && error,
        });
      } else {
        //console.log("405");
        res.status(405).json({
          status: 405,
          statusText: "Invalid method",
        });
      }
    } else {
      //console.log("401");
      res.status(401).json({
        status: 401,
        statusText: "not authenticated",
      });
    }
  } catch (error) {
    //console.log("businesses error", error.message);
    res.status(500).json({
      status: 500,
      statusText: "Internal Server Error",
      error: error.message,
    });
  }
});
