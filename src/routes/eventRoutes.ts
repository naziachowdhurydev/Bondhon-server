// import { Router } from "express";
// import {
//   createEvent,
//   deleteEvent,
//   getAllEvents,
//   getEventById,
//   getMyEvents,
//   joinEvent,
//   updateEvent,
// } from "../controllers/eventController";
// import { verifyJWT } from "../middleware/verifyJWT";

// const router = Router();

// router.get("/", getAllEvents);
// router.get("/mine", verifyJWT, getMyEvents);
// router.get("/:id", getEventById);

// router.post("/", verifyJWT, createEvent);
// router.patch("/:id", verifyJWT, updateEvent);
// router.delete("/:id", verifyJWT, deleteEvent);

// router.post("/:id/join", verifyJWT, joinEvent);

// export default router;
