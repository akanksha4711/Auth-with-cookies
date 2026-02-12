require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { authRouter } = require("./routers/auth.router");

const app = express();
app.use(cookieParser());
app.use(express.json());
// TODO: Add cors origin
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const PORT = process.env.PORT || 8000;

// Auth Routes
// /auth/login, /auth/logout, /auth/signup, /auth/refresh
app.use("/auth", authRouter);

app.listen(PORT, () => console.log("server listening on port", PORT));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB :)"))
  .catch(() => console.log("Failed to connect to DB :("));
