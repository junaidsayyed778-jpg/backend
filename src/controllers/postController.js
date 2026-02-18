const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");
const postModel = require("../models/postModel");


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController (req, res){
    console.log(req.body, req.file);

   

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "Cohort-2-insta-clone-posts"
    })
  
     const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}
async function getPostController (req, res){

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}


async function getPostDetails(req, res){
    

    const userId= req.user.id
    const postId = req.params.postId

    const post = await postModel.findOne(postId)
    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isValidUser = post.user.toString() === userId;

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    res.status(400).json({
        message: "Post fetched successfully",
        post
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetails
};