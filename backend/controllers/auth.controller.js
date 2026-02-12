const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the details" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // JS cannot access this particular cookie
      secure: process.env.NODE_ENV === "production", // only send the cookie to "https" sites
      maxAge: 15 * 60 * 1000,
    });

    const refreshToken = jwt.sign(
      { sub: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // JS cannot access this particular cookie
      secure: process.env.NODE_ENV === "production", // only send the cookie to "https" sites
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const refresh = (req, res) => {
  // TODO: Wrap it in try catch block
  try {
    const rt = req.cookies.refreshToken;
    if (!rt) {
      return res.status(400).json({ message: "Refresh token not present" });
    }
    const payload = jwt.verify(rt, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ sub: payload.sub }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // JS cannot access this particular cookie
      secure: process.env.NODE_ENV === "production", // only send the cookie to "https" sites
      maxAge: 15 * 60 * 1000,
    });
    return res.status(200).json({ message: "OK" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the details" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(400).json({ message: "Unable to save user" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // TODO: Add path to the cookie options
    path: "/auth/refresh",
  });
  return res.status(200).json({ message: "OK" });
};

// TODO: Add fetchMe controller
const fetchMe = (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  }
  return res.status(500).json({ message: "No user for this request" });
};

module.exports = { login, refresh, signup, logout, fetchMe };
