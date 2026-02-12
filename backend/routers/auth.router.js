const express = require("express");
const {
  login,
  refresh,
  signup,
  logout,
  fetchMe,
} = require("../controllers/auth.controller");
const { verifyAuth } = require("../middlewares/verfyAuth");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/signup", signup);
authRouter.post("/refresh", refresh); // new route
// TODO: Add a protected /auth/me route which returns the user
// TODO: Add verifyAuth middleware

module.exports = { authRouter };
