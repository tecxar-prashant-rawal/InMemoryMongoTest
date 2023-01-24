import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
//dirname is not available in es6 so found workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var dir = "./data";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

export default async function connect() {
  const mongoServer = await MongoMemoryServer.create({
    instance: {
      dbPath: path.join(`${__dirname}`, "/data"), // by default create in temp directory, we are storing in data directory
      storageEngine: "wiredTiger",
      // replSet: "testset", //this is default name we can change in by proving new name while initialize replset
    },
  });

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
