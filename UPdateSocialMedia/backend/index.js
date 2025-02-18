const express = require('express');
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/users');
const postRoutes = require('./routers/posts');
const friendRoutes = require('./routers/friends');
const cors = require('cors');
require('dotenv').config(); 


const app = express();
// Middleware
const corsOptions = {
  origin:'http://localhost:5173',
  credentials:true
}
app.use(cors(corsOptions));
app.use(express.json())
const DB = require("./Config/Dbconnection")
DB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/friends', friendRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
