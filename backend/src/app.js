const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
   {
  origin: "http://localhost:5173",  
    credentials: true
   }
))

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes)


module.exports = app