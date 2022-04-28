import { compare } from "bcrypt";
import { find, findOne } from "./crud/find";
import { createJwt } from "./jwt";

export default async (req, res) => {
  const { email, password } = JSON.parse(req?.body);
  const method = req?.method;

  //1. check if method is not POST and there are no values
  //if there are no values, return
  if (method !== "POST" && !email && !password) {
    res
      .status(405)
      .json({ status: 405, statusText: "Invalid method/missing data" });
    return;
  }

  console.log("Email: " + email, "Password: " + password);

  try {
    //2. check if user exist, using the email address
    const { status, statusText, data } = await find(
      "managers",
      { email: email },
      {
        projection: {
          email: 1,
          password: 1,
          apiKey: 1,
          role: 1,
          fullName: 1,
          phone: 1,
        },
      }
    );

    console.log("status: " + status, "statusText: " + statusText);

    if (status !== 200) {
      res.status(404).json({ status: status, statusText: statusText });
      return;
    }

    //3. compare the password to the database password
    const match = await compare(password, data?.password);
    console.log("match: " + match);

    //4. create jwt and pass it to the response object
    if (match) {
      const { _id, email, apiKey, role, fullName, phone } = data;
      const jwt = createJwt({
        id: _id,
        email,
        apiKey,
        role,
      });
      console.log("jwt: " + jwt);
      res.status(200).json({
        status: 200,
        statusText: "Logged in successfully",
        authToken: jwt,
        id: _id,
        email: email,
        fullName: fullName,
        phone: phone,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, statusText: "Provide email/password" });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "internal server error",
      error: error.message,
    });
    console.log(error.message);
  }
};
