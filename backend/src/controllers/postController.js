const ImageKit = require("imagekit");
const postModel = require("../models/postModel");
const likeModel = require("../models/likeModel");


const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,

});
async function createPostController(req, res) {
    console.log(req.body, req.file);

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Image file is required"
        });
    }

    const uploadedFile = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: uploadedFile.url,
        user: req.user.id
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

async function getPostDetails(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findOne(postId);
  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  res.status(400).json({
    message: "Post fetched successfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "  Post liked succesfully",
    like,
  });
}

async function sendLikes(req, res) {
  const { postId } = req.body;

  const existing = await like.findOne({
    user: req.user.id,
    post: postId,
  });

  if (existing) {
    return res.status(400).json({
      message: "Already requested",
    });
  }
  const like = await likeModel.create({
    user: req.user.id,
    post: postId,
  });

  res.json(like);
}

async function acceptLike(req, res) {
  const { likeId } = req.params;

  const like = await likeModel.findById(likeId);

  if (!like)
    return res.status(404).json({
      message: "Not found",
    });

  if (like.status !== "ACCEPTED") {
    like.status = "ACCEPTED";
    await like.save();

    await postModel.findByIdAndUpdate(like.post, {
      $inc: { likeCount: 1 },
    });
  }

  res.json({ message: "Like accepted" });
}

async function getFeedController(req, res) {

  const user = req.user

    const posts =await Promise.all ((await postModel.find({}).sort({_id: -1}).populate("user").lean())
    .map(async(post)=>{

      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id
      }) 
       post.isLiked = Boolean(isLiked)
       return post
    }))

  res.status(200).json({
    message: "posts fetched succussfully",
    posts,
  });
}
module.exports = {
  createPostController,
  getPostController,
  getPostDetails,
  likePostController,
  sendLikes,
  acceptLike,
  getFeedController,
};
