import { insertOne } from "../crud/insert";
import { encryptPassword } from "../encrypt";
import moment from "moment";
import { find } from "../crud/find";
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
    const checkEmailExistence = await find(
      "businesses",
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

    //use this as a callback unction when encrypting the password
    async function signUp(hash) {
      const busId = crypto.randomUUID(4).slice(30);

      const date = new Date();

      const url =
        body?.businessName?.split(" ").join("").toLowerCase() + "-" + busId;

      const data = {
        ...body,
        password: hash,
        location: null,
        country: null,
        terms: "agree",
        openingHours: [],
        discount: 0,
        logo: "",
        heroImg: "",
        role: "business",
        adminId: id,
        url,
        createdAt: moment(date).format("lll"),
        apiKey,
      };

      //3. insert data into businesses collection
      const response = await insertOne(eq, res, "businesses", data);

      if (response) {
        //3. return inserted data
        res.status(201).json({
          status: 201,
          statusText: `You have successfully added ${body?.businessName} to your businesses`,
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
