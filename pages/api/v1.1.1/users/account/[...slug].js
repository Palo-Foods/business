import { authenticate } from "../../authentication";
import { statusCode405, statusCode500 } from "../../status/codes";
import { verifyUser } from "../../verification";
import { get } from "../../functions/get";
import { put } from "../../functions/put";
import { deleteItem } from "../../functions/delete";
import Cors from "cors";
import { runMiddleware } from "../../corsMiddleWare";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
});

export default authenticate(async (req, res) => {
  const { slug } = req.query;

  const collection = slug[0];

  const id = slug[1];

  // Run the middleware
  await runMiddleware(req, res, cors);
  //verify user
  const { role } = await verifyUser(req);

  const method = req.method;

  //JSON.parse(JSON.parse(req.body))
  const body = JSON.parse(req.body);

  try {
    //1. check for method, if POST, GET, DELETE, PUT
    //if method does not exist
    if (method === "POST") {
      return statusCode405(res);
    }

    //2. check for method, if POST, GET, DELETE, PUT
    
    if (method === "GET") {
      await get(collection, res, id);
    }

    if (method === "PUT") {
      const set = {
        $set: {
          ...body,
        },
      };

      await put(collection, id, res, set);
    }

    if (method === "DELETE") {
      await deleteItem(collection, id, res);
    }
    //3. find all riders
  } catch (error) {
    statusCode500(res, error);
  }
});
