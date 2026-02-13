const mongoose = require("mongoose")

async function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("CoNNECTED TO db")
    })
    .catch((e)=>{
        console.log("DB failed")
        
    })
}

module.exports = connectToDB;