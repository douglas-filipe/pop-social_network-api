const yup = require("yup");
const createUserSchema = yup.object().shape({
  name: yup.string().strict().required(),
  password: yup.string().strict().required(),
  email: yup.string().email().strict().required(),
});

const loginUserSchema = yup.object().shape({
  password: yup.string().strict().required(),
  email: yup.string().email().strict().required(),
});

module.exports = { createUserSchema, loginUserSchema };
