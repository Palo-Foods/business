import { insertOne } from "../crud/insert";
import { encryptPassword } from "../encrypt";
import moment from "moment";
import { find } from "../crud/find";
import { verifyUser } from "../verification";
import { authenticate } from "../authentication";

export default authenticate(async function handler(req, res) {
  console.log("body: " + JSON.parse(req.body))
  const { id, method, email, body, apiKey } = await verifyUser(req);
  console.log("verify ", id, method, email, body, apiKey);
  try {
    //if businesses doesn't get resolved, the id wont be passed, fix the apiKey issue
    const manager = await find(
      "managers",
      { email: email },
      { projection: { apiKey: 1 } }
    );

    /*    console.log("manager", manager);

    const match = apiKey === manager?.data?.apiKey;

    console.log("match", match);
    if (match) {
      if (method !== "POST") {
        res.status(400).json({
          status: 400,
          statusText: "Invalid method/missing data",
        });

        return;
      }

      //2. Check to see if email already exist
      const { data, error, statusText } = await find(
        "riders",
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
      console.log("apiKey", apiKey);

      //use this as a callback unction when encrypting the password
      async function signUp(hash) {
        const date = new Date();

        console.log("hash ", hash);

        const data = {
          ...body,
          onlineStatus: "unavailable",
          password: hash,
          managerId: id,
          businessId: null,
          role: "rider",
          avatar: null,
          createdAt: moment(date).format("lll"),
          verifiedEmail: false,
          location: null,
          documents: null,
          apiKey,
        };

        console.log("data", data);

        //3. insert data into riders collection
        const response = await insertOne("riders", data);

        const { status, statusText, error } = response;
        console.log("insert one", status, statusText, error);

        res.status(status).json({
          status: status,
          statusText: statusText,
          data: data,
          error: error,
        });
      }
    } else {
      res.status(401).json({
        status: 401,
        statusText: "Unauthenticated",
      });
    } */
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
});
