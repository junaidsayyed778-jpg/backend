const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },

    imageUrl:{
        type: String,
        required: [false, "Image is required for creating for post"]
    },
    user:{
        ref: "user",
        type:mongoose.Schema.Types.ObjectId,
        required: [true, "User id is required to create post"]
    },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked
  likeCount: { type: Number, default: 0 } 
},{timestamps: true})

const postModel = mongoose.model("post", postSchema)
module.exports = postModel