// middlewares/upload.js
const multer = require("multer")

 const upload = multer({
  storage: multer.memoryStorage(), // buffer milega
 
});

module.exports = upload
