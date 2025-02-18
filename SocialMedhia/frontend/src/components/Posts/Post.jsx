import React from 'react';

function Post({ post }) {
  return (
    <div>
      <h3>{post.user.username}</h3>
      <p>{post.content}</p>
      <p>Likes: {post.likes.length}</p>
      <h4>Comments:</h4>
      {post.comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.user.username}: {comment.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Post;