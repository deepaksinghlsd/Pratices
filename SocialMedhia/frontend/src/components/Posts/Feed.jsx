import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts/feed');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h2>Feed</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <p><strong>{post.user.username}</strong></p>
          <p>{post.content}</p>
          <p>Likes: {post.likes.length}</p>
        </div>
      ))}
    </div>
  );
}

export default Feed;