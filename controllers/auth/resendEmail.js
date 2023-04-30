const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "Email not found");
  }
  if (user.verify) {
    throw RequestError(404, "Email already verify");
  }

  const mail = {
    to: email,
    subjekt: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify you email</a>`,
  };
  await sendEmail(mail);

  res.json({
    message: "Email resend success",
  });
};

module.exports = resendEmail;
