const followModel = require("../models/followModel")

async function followUserController(req, res){
    const followerUsername = req.user.username
    const followingsUsername = req.params.username

     if(followerUsername === followerUsername){
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followings: followingsUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `You are already following this ${followingsUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followings: followingsUsername
    })


    res.status(201).json({
        message: "You are following test",
        follow: followRecord
    })
}

async function unfollowUserController(req, res){
    const followerUsername = req.user.username
    const followingsUsername = req.user.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followings: followingsUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `Your are not following ${followingsUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: "Unfollow succeefully"
    })
}
module.exports = {
    followUserController,
    unfollowUserController
}