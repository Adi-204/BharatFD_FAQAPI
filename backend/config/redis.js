import redis from "redis";
import 'dotenv/config';

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

const redisClient = redis.createClient({
    host: REDIS_HOST || 'localhost',
    port: REDIS_PORT || 6379,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Add connection message
redisClient.on("connect", () => {
    console.log(`✅ Redis client connected to ${REDIS_HOST || 'localhost'}:${REDIS_PORT || 6379}`);
});

redisClient.connect();

export default redisClient;
