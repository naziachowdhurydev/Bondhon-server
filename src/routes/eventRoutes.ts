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
router.get("/my-events", verifyJWT, getMyEvents);
router.get("/:id", getEventById);
router.post("/", verifyJWT, createEvent);
router.put("/:id", verifyJWT, updateEvent);
router.delete("/:id", verifyJWT, deleteEvent);

export default router;