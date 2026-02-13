const userModel = require("../models/userModels");
const jwt  = require("jsonwebtoken");
const crypto = require("crypto");

 async function registerController (req, res){
  const { username, email, password, bio, profileImage } = req.body;

  const userExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex")

  const user = userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage
  })

  const token = jwt.sign(
   {
    id: user._id
   },
   process.env.JWT_SECRET,
   {expiresIn: "1d"}
  )

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user:{
        email: (await user).email,
        username: (await user).username,
        bio: (await user).bio,
        profileImage: (await user).profileImage
    }
  })
};

 async function loginCotroller (req, res){
    const {email, username, password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username: username},{email: email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    
    const hash = crypto.createHash("sha256").update(password).digest("hex")
    const isPasswordMatch = hash == user.password;

    if(!isPasswordMatch){
        return res.status(401).json({
            message: "Passwors is incorrect"
        })
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token);

    res.status(201).json({
        message: "User logIn successfully",
        user:{
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile: user.profileImage
        }
    })

 }

 module.exports = {
    registerController,
    loginCotroller
 }
