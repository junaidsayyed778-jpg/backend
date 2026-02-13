require("dotenv").config
const { configDotenv } = require("dotenv");
const app = require("./src/app");
const connectToDB = require("./src/config/database");


configDotenv()
connectToDB();
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})