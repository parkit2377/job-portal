const { createClient } = require("redis");
const { Redis } = require('ioredis');
const env = require('dotenv').config();

// let redisClient;

// const redis = createClient({
//   url: "redis://localhost:6379"
// });

const ioRedis = new Redis(process.env.NODE_ENV == 'development' ? "redis://localhost:6379" : process.env.IOREDIS)



const redisClient = ioRedis;

 


const getOrSet = async(key , ttl , func) => {
  const cacheData = await redisClient.get(key);

  if(cacheData)return cacheData;

  const data = await func();

  

  redisClient.setex(key , ttl , JSON.stringify(data));

  return data;
}

module.exports = {
  redisClient,
  getOrSet,
  ioRedis
};