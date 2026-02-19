const express = require("express");
const { registerController, loginCotroller } = require("../controllers/authController");

const router = express.Router();
//POST /api/auth/register
router.post("/register", registerController);

//POST /api/auth/login
router.post("/login", loginCotroller);

module.exports = router;
