const express = require("express");
const router = express.Router();

const { CreateUserController } = require("../controllers/CreateUserController");
const { LoginUserController } = require("../controllers/LoginUserController");

router.post("/register", CreateUserController);

router.post("/login", LoginUserController);

module.exports = router;
