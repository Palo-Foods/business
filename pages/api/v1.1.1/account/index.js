import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";
import { authenticate } from "../authentication";
import { createJwt } from "../jwt";
import { verifyUser } from "../verification";

export default authenticate(async function read(req, res){
  const { userId, role } = await verifyUser(req);

  const {body, method} = req

  try {
    const { db } = await connectToDatabase();

    switch (method) {
      case "GET":
        const user = await db
        .collection("businesses")
        .findOne({ _id: ObjectId(userId) }, { projection: { password: 0 } });

      res.status(200).json({ ...user, id: user?._id });
        break;
      
      case "PUT":
      const data = JSON.parse(body);
      const updateOne = await db
        .collection("businesses")
        .updateOne({ _id: ObjectId(userId) }, { $set: { ...data } });
      

      if (updateOne?.modifiedCount) {
        const results = await db
          .collection("businesses")
          .findOne({ _id: ObjectId(userId) }, { projection: { password: 0 } });

         const { _id, role, email, fullName, verified, createdAt, phone, banner } = results;

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
          fullName,
          id: _id,
          verified,
          phone,
          createdAt,
          banner
        };

        res.status(200).json(data);
      } else {
        res.status(404).json({ msg: "Update failed" });
      }
        break;
      
      case "DELTE":
        const response = await db
        .collection("businesses")
        .deleteOne({ _id: ObjectId(userId) });

      if (response.deletedCount) {
        res.status(200).json({ msg: "Business was successfully deleted" });
      } else {
        res.status(400).json({ msg: "Business was not deleted" });
      }
        break;
      
      default: res.status(400).json({ msg: "Invalid method"})
        break;
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
