import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Load environment variables
dotenv.config();

// Setup
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookieParser());

//  Dynamic CORS for both local + Render
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

//  API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//  Health check route (important to keep before wildcard)
app.get("/", (req, res) => {
  res.send(" Backend server is running successfully!");
});

//  Serve static files (for full-stack deployment)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // This wildcard must come LAST
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//  Start the server
server.listen(PORT, () => {
  console.log(` Server running on port: ${PORT}`);
  connectDB();
});
