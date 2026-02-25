import { useContext } from "react";
import { PostContext } from "../pages/post.context";
import { getFeed } from '../services/post.api.js';

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

  return { loading, feed, post, handleGetFeed };
};