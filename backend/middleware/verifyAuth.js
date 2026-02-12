const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const verifyAuth = async (req, res, next) => {
  try {
    const at = req.cookies.accessToken;
    if (!at) {
      return res.status(400).json({ message: "Missing access token" });
    }

    const payload = jwt.verify(at, process.env.JWT_SECRET); //payload -> { sub: userInformation(non sensetive) }
    const userId = payload.sub;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { verifyAuth };
