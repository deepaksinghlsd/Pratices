import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7070/api/posts', { text }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setText('');
    } catch (err) {
      console.error('Error creating post', err);
    }
  };

  return (
    <div>
      <h3>Create a Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        ></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
