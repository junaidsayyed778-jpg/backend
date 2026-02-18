const express = require("express");
const {createPostController, getPostController, getPostDetails} = require("../controllers/postController");
const upload = require("../middleware/upload");
const identifyUser = require("../middleware/authMiddleware");


const router = express.Router();

router.post("", upload.single("image"),identifyUser, createPostController);

//GET /api.posts
router.get("/",identifyUser, getPostController)

//GET /api/posts/details/:id
router.get("/details/:postId",identifyUser, getPostDetails)

module.exports = router