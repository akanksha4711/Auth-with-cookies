const express = require("express");
const {
  login,
  refresh,
  signup,
  logout,
  fetchMe,
} = require("../controllers/auth.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/signup", signup);
authRouter.post("/refresh", refresh); // new route
// TODO: Add a protected /auth/me route which returns the user
authRouter.get("/me", verifyAuth, fetchMe);
// TODO: Add verifyAuth middleware

module.exports = { authRouter };
