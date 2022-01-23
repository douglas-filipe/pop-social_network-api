const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  PasswordIncorrectException,
} = require("../exceptions/PasswordIncorrectException");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SEC;

const CreateUserService = async (body) => {
  const newUser = new User({
    ...body,
  });
  const savedUser = await newUser.save();
  const { password, ...others } = savedUser._doc;
  const { email, name, _id } = others;
  return { email, name, _id };
};

const LoginUserService = async (password, user) => {
  try {
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword) {
      const { password, ...others } = user._doc;
      const { _id, name, email } = others;
      const token = jwt.sign({ email, _id }, secret, {
        expiresIn: "10d",
      });
      return { _id, name, email, token: token };
    } else {
      throw new PasswordIncorrectException("Incorrect password", 400);
    }
  } catch (e) {
    throw new PasswordIncorrectException(e.message, e.status);
  }
};

module.exports = { CreateUserService, LoginUserService };
