import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export default async function connect() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  console.log("this is mongoUri", mongoUri);
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, { dbName: "testMemory" });
  console.log(`mongoDB successfully connected to ${mongoUri}`);
}
