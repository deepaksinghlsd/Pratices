import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FriendSearch = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:7070/api/users/search?username=${username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (err) {
      toast.error('Failed to search users');
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      await axios.post(`/api/friends/request`, { userId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Friend request sent!');
    } catch (err) {
      toast.error('Failed to send friend request');
    }
  };

  return (
    <div>
      <h3>Send Friend Request</h3>
      <input
        type="text"
        placeholder="Search by username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={searchUsers}>Search</button>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username}
            <button onClick={() => sendFriendRequest(user._id)}>Send Friend Request</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
