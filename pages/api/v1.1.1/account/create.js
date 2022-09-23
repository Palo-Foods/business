/**
 * description: allows store to sign up
 * params email: string, password: string
 * functions find: function, createJwt: function,
 * send response with {authToken: {email: string, role: string, userId: string, apiKey: string}}
 */
import { genSalt, hash } from "bcrypt";
import moment from "moment";
import { connectToDatabase } from "../../../../lib/mongodb";
import { createJwt } from "../jwt";

export default async function create(req, res) {
  const { name, email, password } = JSON.parse(req.body);

  //1. check for method
  //if method does not exist
  if (req.method !== "POST") {
    res.status(400).json({ msg: "Invalid method" });
    return;
  }

  try {
    const { db } = await connectToDatabase();

    const results = await db
      .collection("managers")
      .findOne({ email }, { projection: { email: 1 } });

    //3. compare the results password to the req password
    if (!results?.email) {
      //hash password
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const date = new Date();

      const userData = {
        fullName,
        email,
        agree: true,
        role: "manager",
        password: hashedPassword,
        createdAt: moment(date).format("lll"),
        verifiedEmail: false,
        verified: null,
      };

      const response = await db.collection("managers").insertOne(userData);

      //fetch user after signup
      if (response.acknowledged === true) {
        const results = await db
          .collection("managers")
          .findOne({ email }, { projection: { password: 0 } });

        const jwt = createJwt({
          userId: results?._id,
          role: results?.role,
          email: results?.email,
          verified: results?.verified,
        }, "8h");

        const data = {
          authToken: jwt,
          role: results?.role,
          email: results?.email,
          fullName: results?.fullName,
          verified: results?.verified,
          id: results?._id,
        };

        res.status(201).json(data);
      } else {
        res.status(400).json({ msg: "Creating user failed" });
      }
    } else {
      res.status(404).json({ msg: "User with email already exist" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
