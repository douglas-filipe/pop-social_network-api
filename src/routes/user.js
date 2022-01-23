const express = require("express");
const router = express.Router();

const {
  CreateUserController,
  LoginUserController,
} = require("../controllers/user.controllers");
const {
  verifyDuplicateEmail,
  verifyEmailExists,
} = require("../middlewares/user.middleware");
const { validate } = require("../middlewares/validate.middleware");
const {
  createUserSchema,
  loginUserSchema,
} = require("../schemas/user.schemas");

router.post(
  "/register",
  validate(createUserSchema),
  verifyDuplicateEmail,
  CreateUserController
);

router.post(
  "/login",
  validate(loginUserSchema),
  verifyEmailExists,
  LoginUserController
);

module.exports = router;
