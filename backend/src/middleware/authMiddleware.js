const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next){
     const token = req.cookies.token

    if(!token){
        res.status(404).json({
            message: "Token not provided, Unathorized acces"
        })
    }

    let decoded = null

   try{
      decoded = jwt.verify(token, process.env.JWT_SECRET)
   }catch(err){
    res.status(401).json({
        message: "User is not Unathorized"
    })
   }

   req.user = decoded

   next();
}

module.exports = identifyUser