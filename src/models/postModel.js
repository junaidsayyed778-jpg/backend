const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },

    imgUrl:{
        type: String,
        required: [true, "Image is required for creating for post"]
    },
    user:{
        ref: "user",
        type:mongoose.Schema.Types.ObjectId,
        required: [true, "User id is required to create post"]
    }
})

const postModel = mongoose.model("post", postSchema)
module.exports = postModel