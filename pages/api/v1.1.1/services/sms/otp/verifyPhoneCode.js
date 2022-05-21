import { post } from "axios";

export const VerifyPhoneCode = async (code, phoneNumber) => {
  const data = {
    "api-key": process.env.SMS_API_KEY,
    code: code,
    number: phoneNumber, //"233544919953",
  };
  const headers = {
    "api-key": "V1ZNVExweWp5em9qdGJRRG1rYmY",
  };
  post("https://sms.arkesel.com/api/otp/verify", data, { headers })
    .then((response) => {
      const { status, statusText } = response;
      return response;
    })
    .catch((error) => {
      return error.message;
    });
};
