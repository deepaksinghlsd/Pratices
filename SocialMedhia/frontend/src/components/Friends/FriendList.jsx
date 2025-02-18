import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function FriendList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await api.get('/users/friends');
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  return (
    <div>
      <h2>Friends</h2>
      {friends.map((friend) => (
        <div key={friend._id}>
          <p>{friend.username}</p>
        </div>
      ))}
    </div>
  );
}

export default FriendList;