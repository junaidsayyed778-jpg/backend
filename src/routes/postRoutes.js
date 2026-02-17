const express = require("express");
const {createPostController, getPostController} = require("../controllers/postController");
const upload = require("../middleware/upload")


const router = express.Router();

router.post("", upload.single("image"),createPostController);

//GET /api.posts
router.post("/", getPostController)

module.exports = router