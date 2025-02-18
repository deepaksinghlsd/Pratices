import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:7070/api/posts/feed', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(response.data);
      
      // const tokenFromheader = response.headers.authorization;
      // const token = tokenFromheader.replace('Bearer' , '');
      // console.log(token);
      // setPosts(token);
      
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h3>Feed</h3>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.text}</p>
          <p>by {post.author.username}</p>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
