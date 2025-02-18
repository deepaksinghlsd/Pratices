const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const DBConnection = require("./App/config/dbconnection");
const authRoutes = require("./App/router/authRoutes");
const friendRoutes = require("./App/router/friendRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
DBConnection();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/friends", friendRoutes);

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    io.to(data.receiverId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));