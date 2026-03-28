const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  caption: { type: String, maxlength: 2200, trim: true },
  image: { type: String, required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  
  // ✅ Likes field - MUST be array of ObjectIds
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user' 
  }],
  likeCount: { type: Number, default: 0 }
}, { 
  timestamps: true 
});

const postModel= mongoose.model('post', postSchema);
module.exports = postModel