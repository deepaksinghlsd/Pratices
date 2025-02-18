const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./Router/authRouters');
const userRoutes = require('./Router/userRouter');
const postRoutes = require('./Router/Postrouter');
const commentRoutes = require('./Router/commentRouter');

const app = express();

// Middleware
const corsOptions = {
  origin:'http://localhost:5173',
  credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());


// Connect to MongoDB
const db = require('./Config/Dbconnection')
db()
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));