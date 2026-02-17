const express = require("express");
const createPostController = require("../controllers/postController");
const upload = require("../middleware/upload")


const router = express.Router();

router.post("", upload.single("image"),createPostController)

module.exports = router