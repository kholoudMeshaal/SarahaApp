import mongoose from 'mongoose';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import { createClient } from "redis"

export const redisClient = createClient({
  url: "rediss://default:gQAAAAAAAol8AAIgcDFkODllMTg3NWY4MTQ0ZGU5OGNhN2MxYzY2NzMyMTMyMg@workable-cobra-166268.upstash.io:6379"
});



export const connectionRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client Connected Successfully');
  } catch (error) {
    console.error('Redis client connection error:', error);
    process.exit(1);
  }
};
