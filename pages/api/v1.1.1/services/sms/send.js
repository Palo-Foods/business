import axios from "axios";

export const sendSMS = async (message, receiver) => {
  const data = {
    sender: "Palo Foods",
    message: message,
    recipients: receiver, //array["233545110328"]
  };

  try {
    const config = {
      method: "post",
      url: "https://sms.arkesel.com/api/v2/sms/send",
      headers: {
        "api-key": process.env.SMS_API_KEY,
      },
      data: data,
    };

    const response = await axios(config);
console.log(response.data)
    return JSON.stringify(response.data);
  } catch (error) {
    return error.message;
  }
};
