const express = require("express");
const identifyUser = require("../middleware/authMiddleware");
const { followUserController, unfollowUserController } = require("../controllers/userController");

const router = express.Router();

//POST /api/users/follow/:userId
router.post("/follow/:username", identifyUser, followUserController)

//POST /api/users/unfollow/:userId
router.post("unfollow/:username", identifyUser, unfollowUserController);

module.exports = router