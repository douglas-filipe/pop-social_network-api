require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SEC;

const LoginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Email incorreto" });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same) {
          res.status(401).json({ error: "Senha incorreta" });
        } else {
          const { password, ...others } = user._doc;
          const { _id, name, email } = others;
          const token = jwt.sign({ email, _id }, secret, {
            expiresIn: "120s",
          });

          res.json({ _id, name, email, token: token });
        }
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Error ao logar" });
  }
};

module.exports = { LoginUserController };
