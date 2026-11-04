
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { syncDemoEvents } from "./utils/syncDemoEvents";
import { connectDB } from "./config/db";
import eventRoutes from "./routes/eventRoutes";
import aboutRoutes from "./routes/aboutRoutes";
import joinedEventRoutes from "./routes/joinedEventRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/test", (_req, res) => {
  console.log("API TEST REQUEST RECEIVED");

  res.status(200).json({
    success: true,
    message: "Test route is working!",
  });
});

app.use("/api/about", aboutRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/joined-events", joinedEventRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Shobai server is running!",
  });
});

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Synchronize demo events with MongoDB
    await syncDemoEvents();

    // Start Express after synchronization completes
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
