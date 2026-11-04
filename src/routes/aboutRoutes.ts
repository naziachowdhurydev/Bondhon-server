import express from "express";
import aboutFeatures from "../data/aboutFeatures";

const router = express.Router();

router.get("/features", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "About features fetched successfully",
    data: aboutFeatures,
  });
});

export default router;