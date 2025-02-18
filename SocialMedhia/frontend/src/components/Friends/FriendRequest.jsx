import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await api.get('/users/friend-requests');
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const handleAccept = async (userId) => {
    try {
      await api.post('/users/accept-friend-request', { friendId: userId });
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await api.post('/users/reject-friend-request', { friendId: userId });
      fetchFriendRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      {friendRequests.map((request) => (
        <div key={request._id}>
          <p>{request.username}</p>
          <button onClick={() => handleAccept(request._id)}>Accept</button>
          <button onClick={() => handleReject(request._id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default FriendRequests;