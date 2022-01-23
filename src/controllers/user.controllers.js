const {
  CreateUserService,
  LoginUserService,
} = require("../services/user.services");

const CreateUserController = async (req, res) => {
  try {
    const user = await CreateUserService(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: "Error create acount" });
  }
};

const LoginUserController = async (req, res) => {
  try {
    const { password } = req.body;
    const { user } = req;
    const userToken = await LoginUserService(password, user);
    res.status(200).json(userToken);
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};

module.exports = { CreateUserController, LoginUserController };
