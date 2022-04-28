import { insertOne } from "../crud/insert";
import { encryptPassword } from "../encrypt";
import moment from "moment";
import { find, findOne } from "../crud/find";
import { verifyUser } from "../verification";
import { authenticate } from "../authentication";
import crypto from "crypto"

export default authenticate(async function handler(req, res) {
  const { id, method, body, match } = await verifyUser(req);
  console.log(body)
  try {
    if (method !== "POST" || !match) {
      res.status(400).json({
        status: 400,
        statusText: "Invalid method/missing data",
      });

      return;
    }

    //2. Check to see if email already exist
    const {data, error, statusText} = await findOne(
      "businesses",
      { email: body?.email },
      { projection: { email: 1 } }
    );

    console.log("check", data, error, statusText);

    //if email already exist, abort mission
    if (data?.email) {
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
      const busId = crypto?.randomUUID(4).slice(30);

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
        managerId: id,
        url,
        createdAt: moment(date).format("lll"),
        apiKey,
      };

      //3. insert data into businesses collection
      const response = await insertOne(req, res, "businesses", data);

      const { status, statusText, error } = response;
      console.log(status, statusText, error);

      res.status(status).json({
        status: status,
        statusText: statusText,
        data: data,
        error: error,
      });
    }
  } catch (error) {
    console.log("error", error.message)
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
});
