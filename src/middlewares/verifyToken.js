const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SEC;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(404).json({ message: "Token not found" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, secret);
    req.id = decoded._id;
    return next();
  } catch {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
