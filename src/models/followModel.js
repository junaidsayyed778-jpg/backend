const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
    {
        follower:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:[true, "Followers is required"]
        },
        followings:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "Following is required"]
        }
    },
    {timestamps: true}
);

followSchema.index({ follower: 1, followings: 1}, {unique: true})

const followModel = mongoose.model("follows", followSchema)
module.exports = followModel