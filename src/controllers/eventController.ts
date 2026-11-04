import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectDB } from "../config/db";
import { AuthRequest } from "../middleware/verifyJWT";

export const getUpcomingEvents = async (
  _req: Request,
  res: Response
) => {
  try {
    const db = await connectDB();

    const events = await db
      .collection("events")
      .find({
        eventDate: {
          $gt: new Date().toISOString(),
        },
      })
      .sort({
        eventDate: 1,
      })
      .limit(50)
      .toArray();

    const formattedEvents = events.map((event) => ({
      ...event,
      _id: event._id.toString(),
    }));

    res.status(200).json({
      success: true,
      count: formattedEvents.length,
      data: formattedEvents,
    });
  } catch (error) {
    console.error("Failed to get upcoming events:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load upcoming events.",
    });
  }
};



export const createEvent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please sign in to create an event.",
      });
    }

    const {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !eventType ||
      !location?.trim() ||
      !eventDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All required event information must be provided.",
      });
    }

    const selectedDate = new Date(eventDate);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate <= new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid future event date.",
      });
    }

    const db = await connectDB();

    const newEvent = {
      title: title.trim(),
      description: description.trim(),
      eventType,
      thumbnail: thumbnail?.trim() || "",
      location: location.trim(),
      eventDate: selectedDate.toISOString(),

      creator: {
        userId: req.user.userId,
        name: req.user.name,
        email: req.user.email,
      },

      participants: [],

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection("events").insertOne(newEvent);

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: {
        ...newEvent,
        _id: result.insertedId.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to create event:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create event.",
    });
  }
};


export const getEventById = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
      return;
    }

    const db = await connectDB();

    const event = await db.collection("events").findOne({
      _id: new ObjectId(id),
    });

    if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        ...event,
        _id: event._id.toString(),
      },
    });
  } catch (error) {
    console.error("Get event details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event details",
    });
  }
};

export const getMyEvents = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please sign in.",
      });
    }

    const db = await connectDB();

    const events = await db
      .collection("events")
      .find({ "creator.userId": req.user.userId })
      .sort({ createdAt: -1 })
      .toArray();

    const formattedEvents = events.map((event) => ({
      ...event,
      _id: event._id.toString(),
    }));

    return res.status(200).json({
      success: true,
      data: formattedEvents,
    });
  } catch (error) {
    console.error("Failed to get your events:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load your events.",
    });
  }
};

export const updateEvent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please sign in.",
      });
    }

    const { id } = req.params;

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !eventType ||
      !location?.trim() ||
      !eventDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All required event information must be provided.",
      });
    }

    const selectedDate = new Date(eventDate);

    if (Number.isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid event date.",
      });
    }

    const db = await connectDB();

    const result = await db.collection("events").updateOne(
      {
        _id: new ObjectId(id),
        "creator.userId": req.user.userId,
      },
      {
        $set: {
          title: title.trim(),
          description: description.trim(),
          eventType,
          thumbnail: thumbnail?.trim() || "",
          location: location.trim(),
          eventDate: selectedDate.toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found or you are not its creator.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
    });
  } catch (error) {
    console.error("Failed to update event:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update event.",
    });
  }
};

export const deleteEvent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please sign in.",
      });
    }

    const { id } = req.params;

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const db = await connectDB();

    const result = await db.collection("events").deleteOne({
      _id: new ObjectId(id),
      "creator.userId": req.user.userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found or you are not its creator.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Failed to delete event:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete event.",
    });
  }
};

export const getEventDetails = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
      return;
    }

    const db = await connectDB();

    const event = await db.collection("events").findOne({
      _id: new ObjectId(id),
    });

    if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found in database",
      });
      return;
    }

    const details = {
      _id: event._id.toString(),
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: event.eventDate,
      creator: event.creator || {
        name: "Community Organizer",
        email: "",
        userId: "",
      },
      participants: event.participants || [],
      participantCount: event.participants?.length || 0,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    console.error("Get event details error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching event details",
    });
  }
};