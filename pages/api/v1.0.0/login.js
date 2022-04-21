export default async (req, res) => {
  const { email, password } = JSON.parse(req?.body);
  const method = req?.method;

  try {
    if (method === "POST") {
      const employee = await findOne("employees", { email, password });
      const company = await findOne("company", { email, password });
      if (employee || company) {
        const result = employee || company;
        res.status(200).json({
          status: 200,
          statusText: "Logged in successfully",
          authToken: jwt,
          id: result?._id,
          email: result?.email,
          fullName: result?.fullName,
          role: result?.role,
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
