const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: EMAIL_FROM };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
