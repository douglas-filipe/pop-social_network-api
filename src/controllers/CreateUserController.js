const User = require("../models/User");

const CreateUserController = async (req, res) => {
  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail) return res.status(409).json({ message: "Email exists!" });
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    const { email, name, _id } = others;
    res.status(201).json({ email, name, _id });
  } catch (e) {
    res.status(500).json({ message: "Erro ao cria a conta" });
  }
};

module.exports = { CreateUserController };
