"use strict";
const nodemailer = require("nodemailer");

const Email = require("email-templates");

// async..await is not allowed in global scope, must use a wrapper
export async function verifyEmail(uid, fullName, useremail) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.NEXT_MAIL_HOST,
    port: process.env.NEXT_MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.NEXT_MAIL_AUTH_USER, // user
      pass: process.env.NEXT_MAIL_AUTH_PASSWORD, // password
    },
  });

  const email = new Email({
    views: {
      root: "/pages/api/v1.1.1/services/email/templates/",
      options: { extension: "ejs" },
    },
    message: {
      from: process.env.NEXT_MAIL_AUTH_USER,
    },
    preview: false,
    send: true,
    transport: transporter,
  });

  const { response } = await email.send({
    template: "businessEmailVerification",
    message: {
      to: useremail,
    },
    locals: {
      uid: uid,
      name: fullName,
    },
  });

  if (response.includes("250 OK")) {
    return "Email sent";
  } else {
    return "Sending email failed";
  }
}

verifyEmail().catch((error) => {
  return error;
});
