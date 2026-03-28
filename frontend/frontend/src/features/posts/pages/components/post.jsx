import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../hooks/usePost.js';
import '../components/Post.scss';

const Post = ({ post: initialPost, user }) => {
  const [post, setPost] = useState(initialPost);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { handleToggleLike } = usePost();

  const handleLike = async () => {
    const prevLiked = post.isLiked;
    const prevCount = post.likeCount;
    
    // Optimistic update
    setPost(p => ({
      ...p,
      isLiked: !p.isLiked,
      likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1
    }));
    setIsAnimating(true);

    try {
      const data = await handleToggleLike(post._id);
      setPost(p => ({
        ...p,
        isLiked: data.liked,
        likeCount: data.likeCount
      }));
    } catch {
      // Revert on error
      setPost(p => ({
        ...p,
        isLiked: prevLiked,
        likeCount: prevCount
      }));
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleImageDoubleTap = (e) => {
    e.preventDefault();
    if (!post.isLiked) handleLike();
  };

  return (
    <article className="post-card">
      {/* Header */}
      <header className="post-header">
        <div className="user-info">
          <img 
            src={user?.avatar || 'https://i.pravatar.cc/150?img=12'} 
            alt={user?.username}
            className="avatar"
          />
          <span className="username">{user?.username}</span>
        </div>
        <button className="more-btn" aria-label="More">⋯</button>
      </header>

      {/* Image with double-tap */}
      <div className="image-container" onDoubleClick={handleImageDoubleTap}>
        <img 
          src={post.image} 
          alt={post.caption} 
          className="post-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder.jpg';
          }}
        />
        {isAnimating && !post.isLiked && (
          <span className="heart-overlay">❤️</span>
        )}
      </div>

      {/* Actions */}
      <div className="actions">
        <button 
          className={`action-btn like-btn ${post.isLiked ? 'liked' : ''} ${isAnimating ? 'animate' : ''}`}
          onClick={handleLike}
          aria-label={post.isLiked ? 'Unlike' : 'Like'}
        >
          {post.isLiked ? '❤️' : '🤍'}
        </button>
        <button className="action-btn" aria-label="Comment">💬</button>
        <button className="action-btn" aria-label="Share">✈️</button>
        <button className="action-btn save-btn" aria-label="Save">🔖</button>
      </div>

      {/* Likes */}
      <p className="likes">
        <strong>{post.likeCount?.toLocaleString() || 0}</strong> likes
      </p>

      {/* Caption */}
      <p className="caption">
        <strong>{user?.username}</strong> {post.caption}
        <span className="timestamp"> • 2h</span>
      </p>

      {/* Comments preview */}
      {post.commentCount > 0 && (
        <button className="view-comments">
          View all {post.commentCount} comments
        </button>
      )}

      {/* Add comment */}
      <div className="add-comment">
        <input type="text" placeholder="Add a comment..." />
        <button className="post-btn" disabled>Post</button>
      </div>
    </article>
  );
};

export default Post;