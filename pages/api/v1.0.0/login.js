import { compare } from "bcrypt";
import { find } from "./crud/find";
import { createJwt } from "./jwt";

export default async (req, res) => {
  const { email, password } = JSON.parse(req?.body);
  const method = req?.method;

  try {
    if (method === "POST" && email && password) {
      const manager = await find(
        "managers",
        { email: email },
        { email: 1, role: 1, fullName: 1, phone: 1, password: 1, apiKey: 1 }
      );

      const match = await compare(password, manager.password);

      if (match) {
        const jwt = createJwt(manager);
        manager &&
          res.status(200).json({
            status: 200,
            statusText: "Logged in successfully",
            authToken: jwt,
            id: manager?._id,
            email: manager?.email,
            fullName: manager?.fullName,
            phone: manager?.phone,
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
