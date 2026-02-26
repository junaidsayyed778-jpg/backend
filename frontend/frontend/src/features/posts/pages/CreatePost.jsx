import React, { useRef, useState } from "react";
import "./style/createPost.scss";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);
  const navigate = useNavigate();
  
  // ✅ Fix 1: Object destructuring with curly braces {}
  const { loading, handleCreatePost } = usePost();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputFieldRef.current?.files[0];
    
    if (!file) {
      alert("Please select an image");
      return;
    }

    await handleCreatePost(file, caption);
    navigate("/");
  }

  // ✅ Fix 2: Added return statement for loading state
  if (loading) {
    return (
      <main className="create-post-page">
        <div className="loading-container">
          <h1>Creating post...</h1>
          <div className="spinner"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postImage">Upload Photo</label>
        
        {/* ✅ Added ref to file input */}
        <input 
          type="file" 
          name="postImage" 
          id="postImage" 
          accept="image/*" 
          ref={postImageInputFieldRef}
        />

        <label htmlFor="caption" style={{ marginTop: "10px" }}>
          Caption
        </label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          name="caption"
          id="caption"
          placeholder="Write a caption..."
        />

        <button type="submit" className="button primary-button" disabled={loading}>
          {loading ? "Posting..." : "Share"}
        </button>
      </form>
    </main>
  );
};

export default CreatePost;