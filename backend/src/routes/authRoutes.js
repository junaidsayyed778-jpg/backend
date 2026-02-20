const express = require("express");
const { registerController, loginCotroller, getMeController } = require("../controllers/authController");
const identifyUser = require("../middleware/authMiddleware");

const router = express.Router();
//POST /api/auth/register
router.post("/register", registerController);

//POST /api/auth/login
router.post("/login", loginCotroller);

//GET /api/auth/get-me
router.get("/get-me", identifyUser, getMeController)

module.exports = router;
