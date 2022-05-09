import { ObjectId } from "mongodb";
import { createJwt } from "../jwt";
import { statusCode200, statusCode404 } from "../status/codes";
import { update } from "../db/update";

export const put = async (collection, id, res, set) => {
  //update user account
  const results = await update(collection, { _id: ObjectId(id) }, set); //returns data
  console.log("results", results);
  if (results.matchedCount === 1) {
    const { _id, email, apiKey, role, fullName, phone } = results;

    const jwt = createJwt({
      userId: _id,
      email,
      apiKey,
      role,
    });

    const data = {
      authToken: jwt,
      id: _id,
      email: email,
      fullName: fullName,
      phone: phone,
    };

    return statusCode200(res, data, "Data updated");
  } else {
    return statusCode404(res);
  }
};
