import { post } from "axios";

export const verifyPhone = async (phoneNumber) => {
  const data = {
    expiry: 1,
    length: 6,
    medium: "sms",
    message:
      "Verify your phone number using, %otp_code%. Do not share this with anyone. Code will expiry in %expiry% minutes",
    number: phoneNumber,
    sender_id: "Palo",
    type: "numeric",
  };
  const headers = {
    "api-key": "V1ZNVExweWp5em9qdGJRRG1rYmY",
  };

  try {
    const result = await post(
      "https://sms.arkesel.com/api/otp/generate",
      data,
      {
        headers,
      }
    );
    //return { status, statusText };
  } catch (error) {
    console.log("error", error.message);
    //return error.message;
  }
};
