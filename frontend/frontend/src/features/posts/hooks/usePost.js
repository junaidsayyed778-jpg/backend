import { useContext, useEffect } from "react";
import { PostContext } from "../pages/post.context";
import { createPost, getFeed } from '../services/post.api.js';

export const usePost = () => {
  const context = useContext(PostContext);

  // 🔒 Safety: Ensure context is provided
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }

  const { loading, setLoading, feed, setFeed, post } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      
      // 🔍 Debug: Log the response structure
      console.log("API Response:", data);
      
      // Handle different possible response shapes
      setFeed(data?.posts || data || []);
    } catch (error) {
      console.error("Failed to fetch feed:", error);
      setFeed([]); // Fallback to empty array
    } finally {
      // ✅ Always reset loading, even on error
      setLoading(false);
    }
  };

// 1. handleCreatePost mein error handling add karein
const handleCreatePost = async(imageFile, caption) => {
  try {
      setLoading(true)
      const data = await createPost(imageFile, caption)
      setFeed([data.post, ...feed])
      setLoading(false)
  } catch (error) {
    console.error("Failed to create post:", error)
    alert("Failed to create post. Please try again.")
  } finally {
    setLoading(false)
  }
}

// 2. useEffect mein cleanup/add dependency consideration
useEffect(() => {
  handleGetFeed()
}, []) // ✅ Empty dependency array is fine for initial fetch

  return { loading, feed, post, handleGetFeed, handleCreatePost};
};