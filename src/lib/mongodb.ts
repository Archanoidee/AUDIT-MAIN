import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL as string; // Use DATABASE_URL from .env
const options = {}; // Add any MongoClient options if necessary

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// In development, persist the client to avoid recreation with every request
if (process.env.NODE_ENV === "development") {
  if (!client) {
    client = new MongoClient(uri, options);
  }
  clientPromise = client.connect();
} else {
  // In production, create a new client on each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
