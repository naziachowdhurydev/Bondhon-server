
import { connectDB } from "../config/db";
import { demoEvents } from "../data/demoEvents";

export const syncDemoEvents = async () => {
  try {
    const db = await connectDB();
    const collection = db.collection("events");

    let inserted = 0;
    let updated = 0;
    let unchanged = 0;

    for (const demoEvent of demoEvents) {
      const {
        _id: demoId,
        participants,
        createdAt,
        updatedAt,
        creator,
        ...eventData
      } = demoEvent;

      const now = new Date().toISOString();

      // Check whether this event already exists by its title.
      const existingEvent = await collection.findOne({
        title: demoEvent.title,
      });

      // Adopt an existing event instead of inserting a duplicate.
      if (existingEvent && !existingEvent.demoId) {
        await collection.updateOne(
          { _id: existingEvent._id },
          {
            $set: {
              demoId,
              source: "demo",
            },
          }
        );

        console.log(`Existing event matched: ${demoEvent.title}`);
      }

      // Synchronize the event with MongoDB.
      const result = await collection.updateOne(
        {
          demoId,
          source: "demo",
        },
        {
          $set: {
            ...eventData,
            source: "demo",
            updatedAt: now,
          },
          $setOnInsert: {
            demoId,
            participants: participants ?? [],
            createdAt: createdAt ?? now,
            creator,
          },
        },
        {
          upsert: true,
        }
      );

      if (result.upsertedCount > 0) {
        inserted++;
        console.log(`Demo event inserted: ${demoEvent.title}`);
      } else if (result.modifiedCount > 0) {
        updated++;
        console.log(`Demo event updated: ${demoEvent.title}`);
      } else {
        unchanged++;
      }
    }

    console.log("--------------------------------");
    console.log("Demo event synchronization completed!");
    console.log(`Inserted: ${inserted}`);
    console.log(`Updated: ${updated}`);
    console.log(`Unchanged: ${unchanged}`);
    console.log("--------------------------------");
  } catch (error) {
    console.error("Demo event synchronization failed:", error);
    throw error;
  }
};
