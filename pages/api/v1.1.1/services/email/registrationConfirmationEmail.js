"use strict";
const nodemailer = require("nodemailer");

const Email = require("email-templates");

// async..await is not allowed in global scope, must use a wrapper
export async function onboardingEmail(fullName, userEmail, password, url) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_AUTH_USER, // user
      pass: process.env.MAIL_AUTH_PASSWORD, // password
    },
  });

  const email = new Email({
    views: {
      root: "/pages/api/v1.1.0/services/email/templates/",
      options: { extension: "ejs" },
    },
    message: {
      from: process.env.MAIL_AUTH_USER,
    },
    preview: false,
    send: true,
    transport: transporter,
  });

  const { response } = await email.send({
    template: "registrationConfirmationEmail",
    message: {
      to: userEmail,
    },
    locals: {
      email: userEmail,
      password: password,
      name: fullName,
      url: url,
    },
  });

  if (response.includes("250 OK")) {
    return "Email sent";
  } else {
    console.log("Sending email failed");
    return "Sending email failed";
  }
}

onboardingEmail().catch((error) => {
  console.log(error)
  return error;
});
