// import type { Request, Response } from "express";
// import { ObjectId, type Filter } from "mongodb";
// import { getDB } from "../config/db";
// import type { AuthPayload, UserRole } from "../utils/token";

// const EVENTS = "events";
// const JOINED_EVENTS = "joinedEvents";

// type EventDocument = {
//   title: string;
//   description: string;
//   date: Date;
//   location: string;
//   category: string;
//   image?: string;
//   capacity?: number;
//   organizerEmail: string;
//   organizerName?: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// type JoinedEventDocument = {
//   eventId: ObjectId;
//   userEmail: string;
//   joinedAt: Date;
// };

// function eventsCollection() {
//   return getDB().collection<EventDocument>(EVENTS);
// }

// function joinedEventsCollection() {
//   return getDB().collection<JoinedEventDocument>(JOINED_EVENTS);
// }

// function getUser(req: Request): AuthPayload | null {
//   return req.user ?? null;
// }

// function getParam(req: Request, name: string): string | undefined {
//   const value = req.params[name];
//   return typeof value === "string" ? value : undefined;
// }

// function toObjectId(id: string | undefined): ObjectId | null {
//   if (!id || !ObjectId.isValid(id)) return null;
//   return new ObjectId(id);
// }

// function getString(value: unknown): string | undefined {
//   if (typeof value !== "string") return undefined;
//   const trimmed = value.trim();
//   return trimmed.length > 0 ? trimmed : undefined;
// }

// function getDate(value: unknown): Date | null {
//   if (typeof value !== "string" && !(value instanceof Date)) return null;
//   const date = new Date(value);
//   return Number.isNaN(date.getTime()) ? null : date;
// }

// function getNumber(value: unknown): number | undefined {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string" && value.trim() !== "") {
//     const parsed = Number(value);
//     return Number.isFinite(parsed) ? parsed : undefined;
//   }
//   return undefined;
// }

// function canManageEvent(event: EventDocument, user: AuthPayload): boolean {
//   const role: UserRole | undefined = user.role;
//   return event.organizerEmail === user.email || role === "admin";
// }

// export async function getAllEvents(req: Request, res: Response): Promise<void> {
//   const { category, search, page = "1", limit = "12" } = req.query;

//   const filter: Filter<EventDocument> = {};

//   const categoryFilter = getString(category);
//   if (categoryFilter) {
//     filter.category = categoryFilter;
//   }

//   const searchTerm = getString(search);
//   if (searchTerm) {
//     const pattern = new RegExp(
//       searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
//       "i"
//     );
//     filter.$or = [
//       { title: pattern },
//       { description: pattern },
//       { location: pattern },
//     ];
//   }

//   const pageNumber = Math.max(1, Number.parseInt(String(page), 10) || 1);
//   const pageSize = Math.min(
//     100,
//     Math.max(1, Number.parseInt(String(limit), 10) || 12)
//   );

//   const [events, total] = await Promise.all([
//     eventsCollection()
//       .find(filter)
//       .sort({ date: 1, createdAt: -1 })
//       .skip((pageNumber - 1) * pageSize)
//       .limit(pageSize)
//       .toArray(),
//     eventsCollection().countDocuments(filter),
//   ]);

//   res.json({
//     data: events,
//     page: pageNumber,
//     limit: pageSize,
//     total,
//     totalPages: Math.ceil(total / pageSize),
//   });
// }

// export async function getEventById(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const eventId = toObjectId(getParam(req, "id"));
//   if (!eventId) {
//     res.status(400).json({ message: "Invalid event id" });
//     return;
//   }

//   const [event, attendeeCount] = await Promise.all([
//     eventsCollection().findOne({ _id: eventId }),
//     joinedEventsCollection().countDocuments({ eventId }),
//   ]);

//   if (!event) {
//     res.status(404).json({ message: "Event not found" });
//     return;
//   }

//   res.json({ data: { ...event, attendeeCount } });
// }

// export async function getMyEvents(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const user = getUser(req);
//   if (!user) {
//     res.status(401).json({ message: "Authentication required" });
//     return;
//   }

//   const events = await eventsCollection()
//     .find({ organizerEmail: user.email })
//     .sort({ date: 1, createdAt: -1 })
//     .toArray();

//   res.json({ data: events });
// }

// export async function createEvent(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const user = getUser(req);
//   if (!user) {
//     res.status(401).json({ message: "Authentication required" });
//     return;
//   }

//   const body = req.body as Record<string, unknown>;
//   const title = getString(body.title);
//   const description = getString(body.description);
//   const location = getString(body.location);
//   const eventDate = getDate(body.date);

//   if (!title || !description || !location || !eventDate) {
//     res.status(400).json({
//       message: "title, description, location and a valid date are required",
//     });
//     return;
//   }

//   const now = new Date();
//   const capacity = getNumber(body.capacity);

//   const event: EventDocument = {
//     title,
//     description,
//     date: eventDate,
//     location,
//     category: getString(body.category) ?? "general",
//     image: getString(body.image),
//     capacity: capacity !== undefined ? Math.max(0, capacity) : undefined,
//     organizerEmail: user.email,
//     organizerName: user.name,
//     createdAt: now,
//     updatedAt: now,
//   };

//   const result = await eventsCollection().insertOne(event);

//   res.status(201).json({
//     message: "Event created successfully",
//     data: { ...event, _id: result.insertedId },
//   });
// }

// export async function updateEvent(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const user = getUser(req);
//   if (!user) {
//     res.status(401).json({ message: "Authentication required" });
//     return;
//   }

//   const eventId = toObjectId(getParam(req, "id"));
//   if (!eventId) {
//     res.status(400).json({ message: "Invalid event id" });
//     return;
//   }

//   const event = await eventsCollection().findOne({ _id: eventId });
//   if (!event) {
//     res.status(404).json({ message: "Event not found" });
//     return;
//   }

//   if (!canManageEvent(event, user)) {
//     res.status(403).json({ message: "You cannot update this event" });
//     return;
//   }

//   const body = req.body as Record<string, unknown>;
//   const updates: Partial<EventDocument> = {};

//   const title = getString(body.title);
//   if (title) updates.title = title;

//   const description = getString(body.description);
//   if (description) updates.description = description;

//   const location = getString(body.location);
//   if (location) updates.location = location;

//   const category = getString(body.category);
//   if (category) updates.category = category;

//   const image = getString(body.image);
//   if (image) updates.image = image;

//   const capacity = getNumber(body.capacity);
//   if (capacity !== undefined) updates.capacity = Math.max(0, capacity);

//   if (body.date !== undefined) {
//     const eventDate = getDate(body.date);
//     if (!eventDate) {
//       res.status(400).json({ message: "date must be a valid date" });
//       return;
//     }
//     updates.date = eventDate;
//   }

//   if (Object.keys(updates).length === 0) {
//     res.status(400).json({ message: "No valid fields to update" });
//     return;
//   }

//   updates.updatedAt = new Date();

//   const updated = await eventsCollection().findOneAndUpdate(
//     { _id: eventId },
//     { $set: updates },
//     { returnDocument: "after" }
//   );

//   res.json({
//     message: "Event updated successfully",
//     data: updated,
//   });
// }

// export async function deleteEvent(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const user = getUser(req);
//   if (!user) {
//     res.status(401).json({ message: "Authentication required" });
//     return;
//   }

//   const eventId = toObjectId(getParam(req, "id"));
//   if (!eventId) {
//     res.status(400).json({ message: "Invalid event id" });
//     return;
//   }

//   const event = await eventsCollection().findOne({ _id: eventId });
//   if (!event) {
//     res.status(404).json({ message: "Event not found" });
//     return;
//   }

//   if (!canManageEvent(event, user)) {
//     res.status(403).json({ message: "You cannot delete this event" });
//     return;
//   }

//   await Promise.all([
//     eventsCollection().deleteOne({ _id: eventId }),
//     joinedEventsCollection().deleteMany({ eventId }),
//   ]);

//   res.status(204).send();
// }

// export async function joinEvent(req: Request, res: Response): Promise<void> {
//   const user = getUser(req);
//   if (!user) {
//     res.status(401).json({ message: "Authentication required" });
//     return;
//   }

//   const eventId = toObjectId(getParam(req, "id"));
//   if (!eventId) {
//     res.status(400).json({ message: "Invalid event id" });
//     return;
//   }

//   const event = await eventsCollection().findOne({ _id: eventId });
//   if (!event) {
//     res.status(404).json({ message: "Event not found" });
//     return;
//   }

//   const joined = joinedEventsCollection();

//   const existing = await joined.findOne({
//     eventId,
//     userEmail: user.email,
//   });
//   if (existing) {
//     res.status(409).json({ message: "You already joined this event" });
//     return;
//   }

//   if (event.capacity !== undefined) {
//     const attendeeCount = await joined.countDocuments({ eventId });
//     if (attendeeCount >= event.capacity) {
//       res.status(409).json({ message: "This event is full" });
//       return;
//     }
//   }

//   try {
//     await joined.insertOne({
//       eventId,
//       userEmail: user.email,
//       joinedAt: new Date(),
//     });
//   } catch (error) {
//     if ((error as { code?: number }).code === 11000) {
//       res.status(409).json({ message: "You already joined this event" });
//       return;
//     }
//     throw error;
//   }

//   res.status(201).json({ message: "Joined event successfully" });
// }

// export async function getJoinedEvents(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const user = getUser(req);
//   if (!user) {
//     res.status(401).json({ message: "Authentication required" });
//     return;
//   }

//   const joins = await joinedEventsCollection()
//     .find({ userEmail: user.email })
//     .sort({ joinedAt: -1 })
//     .toArray();

//   if (joins.length === 0) {
//     res.json({ data: [] });
//     return;
//   }

//   const events = await eventsCollection()
//     .find({ _id: { $in: joins.map((join) => join.eventId) } })
//     .toArray();

//   const eventsById = new Map(
//     events.map((event) => [event._id.toHexString(), event])
//   );

//   const data = joins.flatMap((join) => {
//     const event = eventsById.get(join.eventId.toHexString());
//     return event ? [{ ...event, joinedAt: join.joinedAt }] : [];
//   });

//   res.json({ data });
// }

// export async function leaveEvent(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const user = getUser(req);
//   if (!user) {
//     res.status(401).json({ message: "Authentication required" });
//     return;
//   }

//   const eventId = toObjectId(getParam(req, "eventId"));
//   if (!eventId) {
//     res.status(400).json({ message: "Invalid event id" });
//     return;
//   }

//   const result = await joinedEventsCollection().deleteOne({
//     eventId,
//     userEmail: user.email,
//   });

//   if (result.deletedCount === 0) {
//     res.status(404).json({ message: "You have not joined this event" });
//     return;
//   }

//   res.status(204).send();
// }
