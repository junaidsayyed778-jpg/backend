const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");
const postModel = require("../models/postModel");
const jwt = require("jsonwebtoken")


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController (req, res){
    console.log(req.body, req.file);

    const token = req.cookies.token

    if(!token){
        res.status(404).json({
            message: "Token not provided, Unathorized acces"
        })
    }

   try{
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
   }catch(err){
    res.status(401).json({
        message: "User is not Unathorized"
    })
   }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "Cohort-2-insta-clone-posts"
    })
  
     const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}
async function getPostController (req, res){
    const token = req.cookies.token
    let decoded;
    try{
     decoded = jwt.verify(token, process.env.JWT_SECRET )
    }catch(err){
        return res.status(401).json({
            message: "Token invalid"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}

module.exports = {
    createPostController,
    getPostController
};