import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreatePost from '../Posts/CreatePost';
import Feed from '../Posts/Feed';
import FriendList from '../Friends/FriendList';
import FriendRequests from '../Friends/FriendRequest';
import UserSearch from '../Friends/UserSearch';

function Dashboard() {
  return (
    <div className="dashboard">
      <nav>
        <ul>
          <li><Link to="/dashboard">Feed</Link></li>
          <li><Link to="/dashboard/create-post">Create Post</Link></li>
          <li><Link to="/dashboard/friends">Friends</Link></li>
          <li><Link to="/dashboard/friend-requests">Friend Requests</Link></li>
          <li><Link to="/dashboard/user-search">User Search</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/friends" element={<FriendList />} />
        <Route path="/friend-requests" element={<FriendRequests />} />
        <Route path="/user-search" element={<UserSearch />} /> 
      </Routes>
    </div>
  );
}

export default Dashboard;