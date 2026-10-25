import { redisClient } from "../connection.redis.js";

export const setValue = async ({ key, value, ttl } = {}) => {
  try {
    value = typeof value === "string" ? value : JSON.stringify(value);
    ttl
      ? await redisClient.set(key, value, { EX: ttl })
      : await redisClient.set(key, value);
  } catch (error) {
    console.error("Redis client set value error:", error);
  }
};
export const UpdateValue = async ({ key, value, ttl } = {}) => {
  try {
    if (!(await redisClient.exists(key))) {
      return 0;
    }
    await redisClient.set(key, value, { EX: ttl });
  } catch (error) {
    console.error("Redis update fail:", error);
  }
};
export const getValue = async (key) => {
  try {
    try {
      return JSON.parse(await redisClient.get(key));
    } catch (error) {
      return await redisClient.get(key);
    }
  } catch (error) {
    console.error("Redis get value error:", error);
  }
};
export const ttl = async (key) => {
  try {
    return await redisClient.ttl(key);
  } catch (error) {
    console.error("Redis ttl fail:", error);
  }
};
export const exist = async (key) => {
  try {
    return await redisClient.exists(key);
  } catch (error) {
    console.error("Redis exist fail:", error);
  }
};
export const expire = async ({ key, ttl }) => {
  try {
    return await redisClient.expire(key, ttl);
  } catch (error) {
    console.error("Redis expire fail:", error);
  }
};
export const deleteKey = async (key) => {
  try {
    if (!key?.length) return 0;
    return await redisClient.del(key);
  } catch (error) {
    console.error("Redis delete key fail:", error);
  }
};
export const keys = async (key) => {
  try {
    return await redisClient.keys(`${key}*`);
  } catch (error) {
    console.error("Redis keys fail:", error);
  }
};
export const increment = async (keyy) => {
  try {
    return await redisClient.incr(keyy);
  } catch (error) {
    console.error('Redis increment fail:', error);
  }
}