import { insertOne } from "../crud/insert";
import { encryptPassword } from "../encrypt";
import moment from "moment";
import { findOne } from "../crud/find";
import { verifyUser } from "../verification";
import { authenticate } from "../authentication";

export default authenticate(async function handler(req, res) {
  const { id, method, body, match } = verifyUser(req);
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
      console.log("hey");
      return;
    }

    //1. encrypt password, get token and apiKey
    const { apiKey } = await encryptPassword(body?.password, signUp);

    const date = new Date();

    //use this as a callback unction when encrypting the password
    async function signUp(hash) {
      const busId = nanoid(4);

      const url =
        body?.businessName?.split(" ").join("").toLowerCase() + "-" + busId;

      const data = {
        ...body,
        password: hash,
        location: null,
        country: null,
        terms: agree,
        openingHours: [],
        discount: 0,
        logo: "",
        heroImg: "",
        role: "business",
        managerId: id,
        url,
        createdAt: moment(date).format("lll"),
        apiKey,
      };

      //3. insert data into managers collection
      const response = await insertOne("managers", data);

      if (response) {
        //3. return inserted data
        res.status(201).json({
          status: 201,
          statusText: "You have successfully added business to your managers",
        });
      } else {
        res
          .status(401)
          .json({ status: 401, statusText: "Registration failed" });
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
