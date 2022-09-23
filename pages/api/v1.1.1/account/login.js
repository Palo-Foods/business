/**
 * description: allows management stores to login
 * params email: string, password: string
 * functions find: function, createJwt: function,
 * send response with {authToken: {email: string, role: string, userId: string, apiKey: string}}
 */
import { compare } from "bcrypt";
import { connectToDatabase } from "../../../lib/mongodb";
import { createJwt } from "../jwt";

export default async function login(req, res) {
  const {method, body} = req
  const { email, password } = JSON.parse(body);

  try {

    switch (method) {
      case "POST":
        const { db } = await connectToDatabase();

    const employee = await db.collection("employees").findOne({ email });

    if (employee?.password) {
      const match = await compare(
        password,
       employee?.password
      );
      if (match) {
        const { _id, email, businessName, fullName, verified, phone, banner } = employee;

        const jwt = createJwt(
          {
            userId: _id,
            role,
            email,
          },
          "8h"
        );

        const data = {
          authToken: jwt,
          email,
          fullName,
          businessName,
          id: _id,
          verified,
          phone,
          banner
        };

        res.status(200).json(data);
      } else {
        //5. if user doesn't exist, send error
        res.status(400).json({ msg: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ msg: "Email does not exist" });
    }
        break;
    
      default: res.status(400).json({ msg: "Invalid method"})
        break;
    }
    
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
