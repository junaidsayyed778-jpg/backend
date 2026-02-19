const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username should be unique"],
        required: [true, "Username is required"],
        trim: true,
    },
    email:{
        type: String,
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Oassword is required"]
    },
    bio: String,
    profileImage: {
        type: String
    },
    followers:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
    ], 
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;