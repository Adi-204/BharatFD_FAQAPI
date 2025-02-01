import redisClient from "../config/redis.js";

export const languages = ['en', 'hi', 'bn'];

export const clearCache = async () => {
    for (const lang of languages) {
        await redisClient.del(`faqs_${lang}`);
    }
};

