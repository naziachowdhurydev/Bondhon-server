
import { Router } from "express";

import {
  getUpcomingEvents,
  getEventById,
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";

import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

// Public routes
router.get("/", getUpcomingEvents);

// Protected static routes (keep before /:id)
router.get("/my-events", verifyJWT, getMyEvents);

// Create event
router.post("/", verifyJWT, createEvent);

// Dynamic routes
router.get("/:id", getEventById);
router.put("/:id", verifyJWT, updateEvent);
router.delete("/:id", verifyJWT, deleteEvent);

export default router;
