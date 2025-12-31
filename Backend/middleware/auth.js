// middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Cookies se access token le rahe hain
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated!" });
    }

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // request me user info attach kar di
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token expired or invalid!" });
  }
};

module.exports = auth;
