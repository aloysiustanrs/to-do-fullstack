const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  token = tokenHeader.startsWith("Bearer ")
    ? tokenHeader.substring(7, tokenHeader.length)
    : null;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
