import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PostFeed from './components/Feed/PostFeed';
import CreatePost from './components/Feed/CreatePost';
import FriendList from './components/Friends/FriendList';
import FriendRequests from './components/Friends/FriendRequest';
import FriendSearch from './components/Friends/FriendSearch';
import PrivateRoute from './components/Layout/PrivateRouter'; // Protected Routes

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <CreatePost />
              <PostFeed />
              <FriendSearch />
            </PrivateRoute>
          }
        />
        <Route path="/friends" element={<PrivateRoute><FriendList /></PrivateRoute>} />
        <Route path="/friend-requests" element={<PrivateRoute><FriendRequests /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
