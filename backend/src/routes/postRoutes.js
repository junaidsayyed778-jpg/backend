const express = require("express");
const {createPostController, getPostController, getPostDetails, getFeedController, toggleLike} = require("../controllers/postController");
const upload = require("../middleware/upload");
const identifyUser = require("../middleware/authMiddleware");


const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    console.log("MIDDLEWARE HIT");
    next();
  },
  upload.single("image"),
  identifyUser,
  createPostController
);
//GET /api/posts
router.get("/",identifyUser, getPostController)

//GET /api/posts/details/:id
router.get("/details/:postId",identifyUser, getPostDetails);

// POST /api/posts/:postId/like
router.post("/:postId/like", identifyUser, toggleLike)

//GET /api/posts/feed
router.get("/feed", identifyUser, getFeedController)
module.exports = router