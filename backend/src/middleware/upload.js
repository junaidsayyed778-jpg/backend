// middlewares/upload.js
const multer = require("multer")

 const upload = multer({
  storage: multer.memoryStorage(), // buffer milega
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB (optional)
});

module.exports = upload
