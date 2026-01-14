const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // ✅ CORRECT cookie name
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated!" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // decoded = { id, iat, exp }
    req.user = decoded;

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(403).json({ message: "Token expired or invalid!" });
  }
};

module.exports = auth;
