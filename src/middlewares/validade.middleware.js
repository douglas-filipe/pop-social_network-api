const validate = (schema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await schema.validate(resource);
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors.join(", ") });
  }
};

module.exports = { validate };
