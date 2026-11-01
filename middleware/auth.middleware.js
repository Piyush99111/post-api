const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Runs BEFORE protected controllers. Checks the JWT and attaches req.user.
const protect = async (req, res, next) => {
  try {
    let token = req.cookies && req.cookies.token;

    // also allow:  Authorization: Bearer <token>
    const header = req.headers.authorization;
    if (!token && header && header.startsWith("Bearer ")) {
      token = header.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User no longer exists" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };
