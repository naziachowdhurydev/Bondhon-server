import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectDB } from "../config/db";
import { AuthRequest } from "../middleware/verifyJWT";
import type { Event, EventParticipant, EventType } from "../types/event";
import { demoEvents } from "../data/demoEvents";

const eventTypes = new Set<EventType>([
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Food Distribution",
  "Health Camp",
]);

const parseEventInput = (body: unknown) => {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return null;
  }

  const input = body as Record<string, unknown>;

  if (
    typeof input.title !== "string" ||
    typeof input.description !== "string" ||
    typeof input.eventType !== "string" ||
    !eventTypes.has(input.eventType as EventType) ||
    typeof input.location !== "string" ||
    typeof input.eventDate !== "string" ||
    (input.thumbnail !== undefined &&
      input.thumbnail !== null &&
      typeof input.thumbnail !== "string")
  ) {
    return null;
  }

  const title = input.title.trim();
  const description = input.description.trim();
  const location = input.location.trim();
  const thumbnail =
    typeof input.thumbnail === "string" ? input.thumbnail.trim() : "";
  const selectedDate = new Date(input.eventDate);

  if (
    !title ||
    title.length > 120 ||
    !description ||
    description.length > 10000 ||
    !location ||
    location.length > 200 ||
    thumbnail.length > 2048 ||
    (thumbnail !== "" && !isHttpURL(thumbnail)) ||
    Number.isNaN(selectedDate.getTime())
  ) {
    return null;
  }

  return {
    title,
    description,
    eventType: input.eventType as EventType,
    thumbnail,
    location,
    eventDate: selectedDate.toISOString(),
    selectedDate,
  };
};

const isHttpURL = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

type StoredEvent = {
  _id: ObjectId;
  participants: EventParticipant[];
  creator?: {
    userId?: string;
  };
  eventDate?: string;
};


export const getUpcomingEvents = async (
  req: Request,
  res: Response
) => {
  try {
    const db = await connectDB();

    const events = await db
      .collection("events")
      .find({
        eventDate: { $gt: new Date().toISOString() },
      })
      .sort({ eventDate: 1 })
      .toArray();

    const formattedEvents: Event[] = events.map((event) => ({
      ...event,
      _id: event._id.toString(),
    })) as Event[];

    return res.status(200).json({
      success: true,
      count: formattedEvents.length,
      data: formattedEvents,
    });
  } catch (error) {
    console.error("Get upcoming events error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
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

    const eventInput = parseEventInput(req.body);

    if (!eventInput) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid event information.",
      });
    }

    if (eventInput.selectedDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid future event date.",
      });
    }

    const db = await connectDB();

    const newEvent = {
      title: eventInput.title,
      description: eventInput.description,
      eventType: eventInput.eventType,
      thumbnail: eventInput.thumbnail,
      location: eventInput.location,
      eventDate: eventInput.eventDate,

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
  res: Response
) => {
  try {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const db = await connectDB();

    const event = await db.collection("events").findOne({
      _id: new ObjectId(id),
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const participants = event.participants || [];

    return res.status(200).json({
      success: true,
      data: {
        ...event,
        _id: event._id.toString(),
        participants,
        participantCount: participants.length,
        requirements: event.requirements || [],
        whatToBring: event.whatToBring || [],
        benefits: event.benefits || [],
        schedule: event.schedule || [],
      },
    });
  } catch (error) {
    console.error("Get event by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch event details.",
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
      .find({
        $or: [
          { "creator.userId": req.user.userId },
          { "creator.email": req.user.email },
        ],
      })
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

    const eventInput = parseEventInput(req.body);

    if (!eventInput) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid event information.",
      });
    }

    const db = await connectDB();

    const result = await db.collection("events").updateOne(
      {
        _id: new ObjectId(id),
        $or: [
          { "creator.userId": req.user.userId },
          { "creator.email": req.user.email },
        ],
      },
      {
        $set: {
          title: eventInput.title,
          description: eventInput.description,
          eventType: eventInput.eventType,
          thumbnail: eventInput.thumbnail,
          location: eventInput.location,
          eventDate: eventInput.eventDate,
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
      $or: [
        { "creator.userId": req.user.userId },
        { "creator.email": req.user.email },
      ],
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

export const joinEvent = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please sign in to join this event.",
      });
    }

    const { eventId } = req.params;

    if (typeof eventId !== "string" || !ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const db = await connectDB();
    const events = db.collection<StoredEvent>("events");
    const id = new ObjectId(eventId);
    const event = await events.findOne({ _id: id });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const existingParticipants = Array.isArray(event.participants)
      ? event.participants
      : [];
    const user = req.user;
    const alreadyJoined = existingParticipants.some(
      (participant) =>
        participant.userId === user.userId ||
        participant.email === user.email,
    );

    if (alreadyJoined) {
      return res.status(200).json({
        success: true,
        alreadyJoined: true,
        message: "You have already joined this event.",
        data: {
          ...event,
          _id: event._id.toString(),
          participants: existingParticipants,
          participantCount: existingParticipants.length,
        },
      });
    }

    const participant = {
      userId: req.user.userId,
      name: req.user.name,
      email: req.user.email,
      joinedAt: new Date().toISOString(),
    };

    const result = await events.updateOne(
      {
        _id: id,
        "participants.userId": { $ne: req.user.userId },
        "participants.email": { $ne: req.user.email },
      },
      {
        $push: { participants: participant },
      },
    );

    if (result.modifiedCount === 0) {
      const currentEvent = await events.findOne({ _id: id });

      if (!currentEvent) {
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }

      const currentParticipants = Array.isArray(currentEvent.participants)
        ? currentEvent.participants
        : [];
      const joinedDuringRequest = currentParticipants.some(
        (currentParticipant) =>
          currentParticipant.userId === user.userId ||
          currentParticipant.email === user.email,
      );

      if (!joinedDuringRequest) {
        return res.status(409).json({
          success: false,
          message: "Unable to join this event. Please try again.",
        });
      }

      return res.status(200).json({
        success: true,
        alreadyJoined: true,
        message: "You have already joined this event.",
        data: {
          ...currentEvent,
          _id: currentEvent._id.toString(),
          participants: currentParticipants,
          participantCount: currentParticipants.length,
        },
      });
    }

    const updatedEvent = await events.findOne({ _id: id });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const updatedParticipants = Array.isArray(updatedEvent.participants)
      ? updatedEvent.participants
      : [];

    return res.status(200).json({
      success: true,
      alreadyJoined: false,
      message: "You joined this event.",
      data: {
        ...updatedEvent,
        _id: updatedEvent._id.toString(),
        participants: updatedParticipants,
        participantCount: updatedParticipants.length,
      },
    });
  } catch (error) {
    console.error("Failed to join event:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to join this event.",
    });
  }
};

export const getJoinedEvents = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please sign in to view your joined events.",
      });
    }

    const db = await connectDB();
    const events = await db
      .collection<StoredEvent>("events")
      .find({
        $or: [
          { "participants.userId": req.user.userId },
          { "participants.email": req.user.email },
        ],
      })
      .sort({ eventDate: 1 })
      .toArray();

    const joinedEvents = events.map((event) => {
      const participants = Array.isArray(event.participants)
        ? event.participants
        : [];

      return {
        ...event,
        _id: event._id.toString(),
        participants,
        participantCount: participants.length,
      };
    });

    return res.status(200).json({
      success: true,
      data: joinedEvents,
    });
  } catch (error) {
    console.error("Failed to get joined events:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load joined events.",
    });
  }
};

export const leaveEvent = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please sign in.",
      });
    }

    const { eventId } = req.params;

    if (typeof eventId !== "string" || !ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const db = await connectDB();
    const id = new ObjectId(eventId);
    const events = db.collection<StoredEvent>("events");
    const event = await events.findOne({ _id: id });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    await events.updateOne(
      { _id: id },
      { $pull: { participants: { userId: req.user.userId } } },
    );
    await events.updateOne(
      { _id: id },
      { $pull: { participants: { email: req.user.email } } },
    );

    const updatedEvent = await events.findOne({ _id: id });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const updatedParticipants = Array.isArray(updatedEvent.participants)
      ? updatedEvent.participants
      : [];

    return res.status(200).json({
      success: true,
      message: "You left this event.",
      data: {
        ...updatedEvent,
        _id: updatedEvent._id.toString(),
        participants: updatedParticipants,
        participantCount: updatedParticipants.length,
      },
    });
  } catch (error) {
    console.error("Failed to leave event:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to leave this event.",
    });
  }
};