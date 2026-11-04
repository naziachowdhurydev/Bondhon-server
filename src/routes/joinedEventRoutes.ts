import { Router } from "express";
import {
  getJoinedEvents,
  joinEvent,
  leaveEvent,
} from "../controllers/eventController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.get("/", verifyJWT, getJoinedEvents);
router.post("/:eventId", verifyJWT, joinEvent);
router.delete("/:eventId", verifyJWT, leaveEvent);

export default router;
