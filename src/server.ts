import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db";

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

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Shobai server is running!",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Shobai server is running on port ${PORT}`);
  });
};

startServer();