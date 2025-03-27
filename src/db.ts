import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export const connnectDB = async() => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();

    await mongoose.connect(mongoURI);
    console.log(`🟢 Connected to In-Memory MongoDB`);
}

export const closeDB = async() => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log(`🛑 Disconnected from In-Memory MongoDB`);
}