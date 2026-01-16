const jwt = require("jsonwebtoken");

// Auth middleware - check if user is logged in
const auth = (req, res, next) => {
  try {
    // ✅ Cookie se token le rahe hain
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated!" });
    }

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token me id + role dono aa jate hain
    // Example: decoded = { id: "123", role: "admin", iat: ..., exp: ... }
    req.user = decoded;

    next(); // user valid → agla route middleware chalega

  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(403).json({ message: "Token expired or invalid!" });
  }
};

module.exports = auth;
