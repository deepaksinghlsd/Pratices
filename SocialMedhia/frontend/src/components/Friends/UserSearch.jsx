import React, { useState } from 'react';
import api from '../../services/api';

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/users/search?q=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      await api.post('/users/send-friend-request', { friendId: userId });
      alert('Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Failed to send friend request');
    }
  };

  return (
    <div>
      <h2>Find Friends</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((user) => (
          <li key={user._id}>
            {user.username}
            <button onClick={() => sendFriendRequest(user._id)}>Send Friend Request</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;