const User = require("../models/User");

const verifyDuplicateEmail = async (req, res, next) => {
  const { email } = req.body;
  const userEmail = await User.findOne({ email: email });
  if (userEmail) return res.status(409).json({ message: "Email exists!" });
  next();
};

const verifyEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const userEmail = await User.findOne({ email: email });
  req.user = userEmail;
  if (!userEmail) return res.status(404).json({ message: "Email not found!" });
  next();
};

module.exports = { verifyDuplicateEmail, verifyEmailExists };
