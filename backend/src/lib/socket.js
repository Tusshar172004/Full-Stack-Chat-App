import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  // When user A calls user B
  socket.on("call:user", ({ to }) => {
    io.to(to).emit("incoming:call", { from: socket.id });
  });

  // When user B accepts the call
  socket.on("call:accepted", ({ to, answer }) => {
    io.to(to).emit("call:accepted", { answer, from: socket.id });
  });

  // When user B rejects the call
  socket.on("call:rejected", ({ to }) => {
    io.to(to).emit("call:rejected", { from: socket.id });
  });

  // Exchange ICE candidates
  socket.on("ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("ice-candidate", { candidate, from: socket.id });
  });

  // Add any cleanup when socket disconnects here if needed
});


export { io, app, server };