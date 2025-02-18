import React, { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const FriendSearch = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    try {
      const response = await api.get(`/users/search?username=${username}`);
      setUsers(response.data);
    } catch (err) {
      toast.error('Failed to search users');
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      await api.post(`http://localhost:7070/friends/request`, { userId });
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
            <button onClick={() => sendFriendRequest(user._id)}>Send Request</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
