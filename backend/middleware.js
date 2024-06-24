const jwt = require("jsonwebtoken");

require("dotenv").config();
const { JWT_SECRET } = process.env;
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({message: "No token provided"});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({message: "Invalid token"});
  }
};

module.exports = { authMiddleware };
