import { Router } from "express";

import {
  getUpcomingEvents,
  createEvent,
  getEventById,
} from "../controllers/eventController";

const router = Router();

router.get("/", getUpcomingEvents);

router.post("/", createEvent);

router.get("/:id", getEventById);

export default router;