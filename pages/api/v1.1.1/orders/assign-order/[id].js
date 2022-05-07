import { ObjectId } from "mongodb";
import { authenticate } from "../../authentication";
import {
  statusCode200,
  statusCode401,
  statusCode404,
  statusCode500,
} from "../../status/codes";
import { insertToArray } from "../../db/update";
import { verifyUser } from "../../verification";
import Cors from "cors";
import { runMiddleware } from "../../corsMiddleWare";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "PUT", "DELETE", "HEAD"],
});

export default authenticate(async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  //verify user
  const { userId, role } = await verifyUser(req);

  const method = req.method;

  const { orderId, riderOnOrder, customerId } = JSON.parse(
    JSON.parse(req.body)
  );

  const collection = "orders";

  try {
    //1. check if authorized to sign up, using match, role
    if (role !== "business" || role !== "manager") {
      statusCode401(res);
      return;
    }

    //2. assign order to rider
    const { fullName, phone, _id } = riderOnOrder;

    const data = {
      $set: {
        "orders.$[elem].assignedTo": {
          riderId: _id,
          fullName: fullName,
          phone: phone,
          onlineStatus: "Busy",
        },
        "orders.$[elem].orderStatus": "Approved",
      },
    };
    //insert into orders where company is
    const results = await insertToArray(
      collection,
      { _id: ObjectId(userId) },
      data,
      { arrayFilters: [{ "elem.orderId": orderId }] },
      {
        upsert: true,
        projection: { orders: 1 },
      }
    );

    console.log("results", results);

    if (results.matchedCount === 1) {
      // 2. if successful update order in customers
      const results = await insertToArray(
        "customers",
        { _id: ObjectId(customerId) },
        {
          $set: {
            "orders.$[elem].orderStatus": "Approved",
          },
        },
        { arrayFilters: [{ "elem.orderId": orderId }] },
        {
          upsert: true,
          projection: { orders: 1 },
        }
      );
      if (results.matchedCount === 1) {
        // 3. if successful update rider online status, and push orderId to orders array
        const data = {
          $push: { orders: orderId },
          $set: {
            onlineStatus: "Order Assigned to rider",
          },
        };

        // 2. if successful update order in rider
        const results = await insertToArray(
          "rider",
          { _id: ObjectId(_id) },
          data,
          { arrayFilters: [{ "elem.orderId": orderId }] },
          {
            upsert: true,
          }
        );

        if (results.matchedCount === 1) {
          statusCode200(res);
        } else {
          statusCode404(res);
        }
      } else {
        statusCode404(res);
      }
    } else {
      statusCode404(res);
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
