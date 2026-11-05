
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { syncDemoEvents } from "./utils/syncDemoEvents";
import { connectDB } from "./config/db";
import eventRoutes from "./routes/eventRoutes";
import aboutRoutes from "./routes/aboutRoutes";
import joinedEventRoutes from "./routes/joinedEventRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";
const configuredClientURL =
  process.env.CLIENT_URL ?? (isProduction ? undefined : "http://localhost:3000");

if (!configuredClientURL) {
  throw new Error("CLIENT_URL is required in production");
}

const clientURL = new URL(configuredClientURL);

if (
  !["http:", "https:"].includes(clientURL.protocol) ||
  clientURL.username ||
  clientURL.password ||
  clientURL.pathname !== "/" ||
  clientURL.search ||
  clientURL.hash
) {
  throw new Error("CLIENT_URL must be an origin without a path or credentials");
}

if (
  isProduction &&
  clientURL.protocol !== "https:" &&
  !clientURL.hostname.endsWith(".localhost") &&
  clientURL.hostname !== "localhost" &&
  clientURL.hostname !== "127.0.0.1"
) {
  throw new Error("CLIENT_URL must use HTTPS in production");
}

app.use(helmet());
app.use(
  cors({
    origin: clientURL.origin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  }),
);
app.use(express.json({ limit: "32kb" }));

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
