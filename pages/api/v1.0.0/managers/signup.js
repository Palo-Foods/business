import { insert, insertOne } from "../crud/insert";
import { encryptPassword } from "../encrypt";
import moment from "moment";
import { findOne } from "../crud/find";
import { verifyUser } from "../verification";
import { authenticate } from "../authentication";

export default authenticate(async function handler(req, res) {
  const { id, method, body, match } = await verifyUser(req);

  try {
    if (method !== "POST" || !match) {
      res.status(400).json({
        status: 400,
        statusText: "Invalid method/missing data",
      });

      return;
    }

    //2. Check to see if email already exist
    const checkEmailExistence = await findOne(
      "managers",
      { email: body?.email },
      { projection: { email: 1 } }
    );

    //if email already exist, abort mission
    if (checkEmailExistence?.email) {
      res.json({
        status: 403,
        statusText: `${email} already exist`,
      });
      return;
    }

    //1. encrypt password, get token and apiKey
    const { apiKey } = await encryptPassword(body?.password, signUp);

    //use this as a callback unction when encrypting the password
    async function signUp(hash) {
      const date = new Date();

      const data = {
        ...body,
        password: hash,
        location: null,
        terms: "agree",
        avatar: "",
        documents: [],
        role: "manager",
        adminId: id,
        createdAt: moment(date).format("lll"),
        apiKey,
      };

      //3. insert data into managers collection
      const response = await insert("managers", data);

      if (response) {
        //3. return inserted data
        res.status(200).json({
          status: 200,
          statusText: "You have successfully added manager",
        });
      } else {
        res
          .status(400)
          .json({ status: 400, statusText: "Registration failed" });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
});
