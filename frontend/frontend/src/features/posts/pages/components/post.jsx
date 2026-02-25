import React from 'react'

const post = ({user, post}) => {
  return (
  <div>
            {/* Post Card */}
        <div className="posts">
          {/* Header */}
          <div className="user-header">
            <img 
              src="https://i.pravatar.cc/150?img=12" 
              alt="avatar" 
              className="avatar" 
            />
            <span className="username">{user.username}</span>
            <button className="more-btn">⋯</button>
          </div>

          {/* Post Image */}
          <img 
            src={post.image} 
            alt="post" 
          />

          {/* Actions */}
          <div className="actions">
            <button className='{post.isLiked?"like": ""}' aria-label="Like">♡</button>
            <button aria-label="Comment">💬</button>
            <button aria-label="Share">✈️</button>
            <button className="save-btn" aria-label="Save">🔖</button>
          </div>

          {/* Likes */}
          <p className="likes">{post.like} likes</p>

          {/* Caption */}
          <p className="caption">
            <span>username</span> This is a clean Instagram-style caption with dark theme support 🌙
            <span className="timestamp">2 HOURS AGO</span>
          </p>

          {/* Comments Preview */}
          <p className="comments-preview">
            View all 42 comments <a href="#" className="view-all">View all</a>
          </p>

          {/* Add Comment */}
          <div className="add-comment">
            <input type="text" placeholder="Add a comment..." />
            <button className="post-btn" disabled>Post</button>
          </div>
        </div>

        {/* Additional Bottom Content (if needed) */}
        <div className="bottom">
          <p className='caption'>
            <span>username</span> {user.caption}
          </p>
        </div>
  </div>
  )
}

export default post
