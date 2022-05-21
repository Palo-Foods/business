import { insert } from "../../db/insert";
import { authenticate } from "../../authentication";
import { findOne } from "../../db/find";
import {
  statusCode201,
  statusCode401,
  statusCode403,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../../status/codes";
import { encryptPassword } from "../../encrypt";
import { verifyUser } from "../../verification";
import { getUserData } from "./userData";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const { slug } = req.query;

  const collection = slug[0];

  const method = req.method;

  //JSON.parse(JSON.parse(req.body))
  const body = JSON.parse(req.body);

  //const collection = "businesses";

  try {
    const role = "admin" || "manager";
    //1. check if authorized to sign up, using match, role
    if (!role) {
      statusCode401(res);
      return;
    }

    //2. check for method
    //if method does not exist
    if (method !== "POST") {
      statusCode405(res);
      return;
    }

    //3. find if user already exist
    const results = await findOne(
      collection,
      { email: body?.email },
      {
        projection: { email: 1 },
      }
    );

    //4. if user doesn't exist, create user
    if (!results?.email) {
      //encrypt password, get token and apiKey
      const { apiKey } = await encryptPassword(body?.password, signUp);

      //use this as a callback unction when encrypting the password
      async function signUp(hash) {
        const data = getUserData(collection, body, hash, userId, role, apiKey);
        //5. insert data into company collection
        const response = await insert(collection, data);

        if (response.acknowledged) {
          statusCode201(res, "Data added");
        } else {
          statusCode404(res, "Adding data to failed");
        }
      }
    } else {
      //6. if user exist, dont create user
      statusCode403(res, "User already exist");
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
