import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectDB } from "../config/db";

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
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
      creator,
    } = req.body;

    if (
      !title ||
      !description ||
      !eventType ||
      !thumbnail ||
      !location ||
      !eventDate ||
      !creator?.name ||
      !creator?.email
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
        message: "Please provide a valid event date.",
      });
    }

    if (selectedDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Event date must be in the future.",
      });
    }

    const db = await connectDB();

    const newEvent = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate: selectedDate.toISOString(),

      creator: {
        name: creator.name,
        email: creator.email,
      },

      participants: [],

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db
      .collection("events")
      .insertOne(newEvent);

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: {
        ...newEvent,
        _id: result.insertedId.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to create event:", error);

    res.status(500).json({
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
    const id = req.params.id;

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
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

    res.status(200).json({
      success: true,
      data: {
        ...event,
        _id: event._id.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to get event:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load event.",
    });
  }
};