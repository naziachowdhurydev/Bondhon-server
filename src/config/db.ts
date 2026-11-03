// import { Db, MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const dbName = process.env.DB_NAME ?? "kindlink";

// if (!uri) {
//   throw new Error("MONGODB_URI is not defined in the environment");
// }

// const client = new MongoClient(uri);
// let db: Db | null = null;

// /**
//  * Opens the MongoDB connection once and reuses it afterwards.
//  */
// export async function connectDB(): Promise<Db> {
//   if (db) return db;

//   await client.connect();
//   db = client.db(dbName);

//   await db
//     .collection("joinedEvents")
//     .createIndex({ eventId: 1, userEmail: 1 }, { unique: true });
//   await db.collection("events").createIndex({ date: 1 });

//   console.log(`Connected to MongoDB database "${dbName}"`);
//   return db;
// }

// /**
//  * Returns the already established database connection.
//  */
// export function getDB(): Db {
//   if (!db) {
//     throw new Error("Database is not connected. Call connectDB() first.");
//   }
//   return db;
// }

// export async function disconnectDB(): Promise<void> {
//   if (!db) return;
//   await client.close();
//   db = null;
// }

import dotenv from "dotenv";

dotenv.config();

import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const client = new MongoClient(uri);

let database: Db;

export const connectDB = async (): Promise<Db> => {
  try {
    if (database) {
      return database;
    }

    await client.connect();

    database = client.db(process.env.DB_NAME || "shobai");

    console.log("MongoDB connected successfully");

    return database;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};