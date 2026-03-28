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

 const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    
    // 🔍 Debug logs
    console.log('🔔 toggleLike called');
    console.log('📦 req.params:', req.params);
    console.log('👤 req.user:', req.user);
    console.log('🆔 postId:', postId, 'Type:', typeof postId);

    // ✅ Validate postId format
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      console.error('❌ Invalid ObjectId format:', postId);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid post ID format' 
      });
    }

    // ✅ Check auth middleware ne user attach kiya
    if (!req.user || !req.user.id) {
      console.error('❌ User not authenticated. req.user:', req.user);
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    const userId = req.user.id;
    console.log('👤 userId from token:', userId);

    // ✅ Find post - with detailed error handling
    let post;
    try {
      post = await Post.findById(postId);
      console.log('🔍 Post lookup result:', post ? 'Found' : 'Not found');
    } catch (findError) {
      console.error('❌ Error finding post:', findError.message);
      return res.status(500).json({ 
        success: false, 
        message: 'Database error while finding post',
        error: findError.message 
      });
    }
    
    if (!post) {
      console.warn('⚠️ Post not found in DB:', postId);
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    console.log('📄 Found post:', { 
      _id: post._id, 
      likes: post.likes, 
      likeCount: post.likeCount,
      likesType: Array.isArray(post.likes) ? 'array' : typeof post.likes
    });

    // ✅ Safe like check (toString() for ObjectId comparison)
    const likesArray = Array.isArray(post.likes) ? post.likes : [];
    const isLiked = likesArray.some(id => {
      const idStr = id?.toString?.() || String(id);
      const userStr = userId?.toString?.() || String(userId);
      return idStr === userStr;
    });

    console.log('❤️ Like status check:', { isLiked, userId });

    if (isLiked) {
      // ❌ Unlike: Remove user from likes
      post.likes = likesArray.filter(id => {
        const idStr = id?.toString?.() || String(id);
        const userStr = userId?.toString?.() || String(userId);
        return idStr !== userStr;
      });
      post.likeCount = Math.max(0, (post.likeCount || 0) - 1);
      console.log('➖ Unliked. New count:', post.likeCount);
    } else {
      // ❤️ Like: Add user (with duplicate prevention)
      const alreadyExists = likesArray.some(id => {
        const idStr = id?.toString?.() || String(id);
        const userStr = userId?.toString?.() || String(userId);
        return idStr === userStr;
      });
      
      if (!alreadyExists) {
        post.likes.push(userId);
        post.likeCount = (post.likeCount || 0) + 1;
        console.log('➕ Liked. New count:', post.likeCount);
      }
    }

    // ✅ Save with validation
    console.log('💾 Saving post...');
    const updatedPost = await post.save();
    console.log('✅ Post saved successfully');

    res.status(200).json({
      success: true,
      liked: !isLiked,
      likeCount: updatedPost.likeCount,
      message: isLiked ? 'Post unliked' : 'Post liked'
    });

  } catch (error) {
    // 🚨 FULL ERROR LOGGING
    console.error('❌❌❌ toggleLike CRASHED ❌❌❌');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
      errorName: error.name
    });
  }
};

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
  toggleLike,
  getFeedController,
};
