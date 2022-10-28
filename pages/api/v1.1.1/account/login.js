/**
 * description: allows management stores to login
 * params email: string, password: string
 * functions find: function, createJwt: function,
 * send response with {authToken: {email: string, role: string, userId: string, apiKey: string}}
 */
import { compare } from "bcrypt";
import { connectToDatabase } from "../../../../lib/mongodb";
import { createJwt } from "../jwt";

export default async function login(req, res) {
  const { email, password } = JSON.parse(req.body);
  const {method} = req
  try {
    switch (method) {
      case "POST":
        const { db } = await connectToDatabase();

        const business = await db.collection("businesses").findOne({ email });

        if (business?.password) {
          const match = await compare(
            password,
            business?.password
          );
          if (match) {
            const { _id, role, email, fullName, businessName, verified, createdAt, phone, location, banner, updatedAt, typeOfBusiness } = business;

            const jwt = createJwt(
              {
              userId: _id,
              role: role,
              email: email,
              verified: verified,
            }, "8h"
            );

            const data = {
              authToken: jwt,
              role,
              email,
              businessName,
              fullName,
              location,
              id: _id,
              verified,
              phone,
              createdAt,
              banner, updatedAt, typeOfBusiness
            };

            res.status(200).json(data);
          } else {
            //5. if user doesn't exist, send error
            res.status(400).json({ msg: "Invalid credentials" });
          }
        } else {
          res.status(404).json({ msg: "Invalid credentials" });
        }
        break;
    
      default: res.status(400).json({ msg: "Invalid method" });
        break;
    }
    
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
