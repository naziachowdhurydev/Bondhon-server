
import "./config/env";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import { syncDemoEvents } from "./utils/syncDemoEvents";
import { connectDB } from "./config/db";

import eventRoutes from "./routes/eventRoutes";
import aboutRoutes from "./routes/aboutRoutes";
import joinedEventRoutes from "./routes/joinedEventRoutes";

const app = express();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// --------------------------------------
// CORS CONFIGURATION
// --------------------------------------

const configuredClientURL = process.env.CLIENT_URL;
let clientOrigin: string | false = false;

if (configuredClientURL) {
  const clientURL = new URL(configuredClientURL);

  if (
    !["http:", "https:"].includes(clientURL.protocol) ||
    clientURL.username ||
    clientURL.password ||
    clientURL.pathname !== "/" ||
    clientURL.search ||
    clientURL.hash
  ) {
    throw new Error(
      "CLIENT_URL must be an origin without a path or credentials"
    );
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

  clientOrigin = clientURL.origin;
}

// --------------------------------------
// MIDDLEWARE
// --------------------------------------

app.use(helmet());

app.use(
  cors({
    origin: clientOrigin,
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
  })
);

app.use(express.json({ limit: "32kb" }));

// --------------------------------------
// HEALTH CHECK ROUTES
// These do not require MongoDB.
// --------------------------------------

app.get("/api/test", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Test route is working!",
  });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Shobai server is running!",
  });
});

// --------------------------------------
// DATABASE INITIALIZATION
// --------------------------------------

let initializationPromise: Promise<void> | undefined;

const initializeApp = (): Promise<void> => {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      await connectDB();
      await syncDemoEvents();

      console.log("Application initialized successfully");
    })().catch((error: unknown) => {
      // Allow a future request to retry initialization.
      initializationPromise = undefined;

      throw error;
    });
  }

  return initializationPromise;
};

// Initialize the database before handling
// routes that depend on MongoDB.
app.use(async (_req, res, next) => {
  try {
    await initializeApp();
    next();
  } catch (error) {
    console.error("Application initialization failed:", error);

    res.status(500).json({
      success: false,
      message: "Server initialization failed",
    });
  }
});

// --------------------------------------
// API ROUTES
// --------------------------------------

app.use("/api/about", aboutRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/joined-events", joinedEventRoutes);

// --------------------------------------
// LOCAL DEVELOPMENT SERVER
// --------------------------------------

const startServer = async () => {
  try {
    await initializeApp();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Only start a local HTTP server when running directly.
// Vercel imports the Express app instead.
if (require.main === module) {
  startServer();
}

export default app;
