import React, { useState, useEffect } from 'react';
import api from '../../services/api';
const FriendRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchFriendRequests = async () => {
    const response = await api.get('/friends/requests');
    setRequests(response.data);
  };

  const handleAccept = async (requestId) => {
    await api.post('/friends/accept', { requestId });
    fetchFriendRequests();
  };

  const handleReject = async (requestId) => {
    await api.post('http://localhost:7070/friends/reject', { requestId });
    fetchFriendRequests();
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.sender.username}
            <button onClick={() => handleAccept(request._id)}>Accept</button>
            <button onClick={() => handleReject(request._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
