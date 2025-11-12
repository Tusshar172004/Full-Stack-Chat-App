import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// ✅ Use environment variable for Render frontend URL
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Store connected users
const userSocketMap = {}; // { userId: socketId }

// ✅ Helper function to get receiver socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// ✅ Handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Broadcast online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // WebRTC & call events
  socket.on("call:user", ({ to }) => {
    io.to(to).emit("incoming:call", { from: socket.id });
  });

  socket.on("call:accepted", ({ to, answer }) => {
    io.to(to).emit("call:accepted", { answer, from: socket.id });
  });

  socket.on("call:rejected", ({ to }) => {
    io.to(to).emit("call:rejected", { from: socket.id });
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("ice-candidate", { candidate, from: socket.id });
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
