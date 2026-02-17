const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


module.exports = app