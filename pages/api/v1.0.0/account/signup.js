import { insertOne } from "../crud/insert";
import { encryptPassword } from "../encrypt";
import { findOne } from "../crud/find";

export default async function handler(req, res) {
  const { fullName, email, phone, password } = JSON.parse(req?.body);
  const method = req?.method;
  try {
    if (
      (method !== "POST" || !fullName || !email, !phone || !password)
    ) {
      res.status(400).json({
        status: 400,
        statusText: "Invalid method/missing data",
      });

      return;
    }

    //set body in a data var

    //2. Check to see if email already exist
    const checkEmailExistence = await findOne(
      "managers",
      { email: email },
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
    const { apiKey } = await encryptPassword(password, signUp);
    
    //use this as a callback unction when encrypting the password
    async function signUp(hash) {
      const data = {
        fullName,
        email,
        phone,
        idType: "",
        idNumber: "",
        region: "",
        district: "",
        location: "",
        role: "admin",
        createdAt: new Date(),
        apiKey,
      };

      //3. insert data into company collection
      const response = await insertOne("managers", data);

      if (response) {
        //3. return inserted data
        res.status(201).json({
          status: 201,
          statusText: "You have successfully added manager",
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
}
