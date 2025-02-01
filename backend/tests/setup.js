import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import redis from "@jest-mock/redis";

jest.mock("redis", () => redis);

let mongoServer;

beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error setting up MongoMemoryServer:", error);
  }
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  } catch (error) {
    console.error("Error shutting down MongoMemoryServer:", error);
  }
});

beforeEach(async () => {
  try {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
    (await import("redis")).mock.reset();
  } catch (error) {
    console.error("Error during test setup:", error);
  }
});
