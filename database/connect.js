import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

export default async function connect() {
  const mongoServer = await MongoMemoryServer.create();

  // This will create an new instance of "MongoMemoryReplSet" and automatically start all Servers
  // const replset = await MongoMemoryReplSet.create({ replSet: { count: 4 } }); // This will create an ReplSet with 4 members

  // const uri = replset.getUri();
  // console.log("uri of replicaset-->", uri);
  // The ReplSet can be stopped again with
  // await replset.stop();

  const mongoUri = mongoServer.getUri();
  console.log("this is mongoUri", mongoUri);
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, { dbName: "testMemory" });
  console.log(`mongoDB successfully connected to ${mongoUri}`);
}
