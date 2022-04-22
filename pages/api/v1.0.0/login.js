import { compare } from "bcrypt";
import { find } from "./crud/find";
import { createJwt } from "./jwt";

export default async (req, res) => {
  const { email, password } = JSON.parse(req?.body);
  const method = req?.method;

  try {
    if (method === "POST") {
      const admin = await find("admins", { email: email });

      const match = compare(password, admin.password);

      if (match) {
        const jwt = createJwt(admin);
        admin &&
          res.status(200).json({
            status: 200,
            statusText: "Logged in successfully",
            authToken: jwt,
            id: admin?._id,
            email: admin?.email,
            fullName: admin?.fullName,
          });
      } else {
        res
          .status(400)
          .json({ status: 400, statusText: "Wrong email/password" });
      }
    } else {
      res
        .status(401)
        .json({ status: 401, statusText: "Provide email/password" });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "internal server error",
      error: error.message,
    });
  }
};
