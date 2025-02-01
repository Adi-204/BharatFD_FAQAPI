import redis from "redis";
import 'dotenv/config';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    socket: {
        reconnectStrategy: (retries) => {
            // Exponential backoff: retries every 1000ms, 2 seconds, etc.
            return Math.min(retries * 50, 500);
        }
    }
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Add connection message
redisClient.on("connect", () => {
    console.log(`✅ Redis client connected to ${REDIS_HOST}:${REDIS_PORT}`);
});

redisClient.connect();

export default redisClient;
