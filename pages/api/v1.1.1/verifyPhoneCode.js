import { VerifyPhoneCode } from "./services/sms/otp/verifyPhoneCode";

export default async (req, res) => {
  //1. check for method
  const method = req.method;

  //get req body data
  const { verificationCode, phone } = JSON.parse(JSON.parse(req.body));

  try {
    if (method === "POST" && phone) {
      //verify phone number
      const result = await VerifyPhoneCode(verificationCode, phone);
      res.status(200).json({ status: 200, statusText: "OK", data: { result } });
    } else {
      res.status(400).json({ status: 400, statusText: "invalid method" });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
};
