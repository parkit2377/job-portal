const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://localhost:6379"
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

const connectRedis = async () => {
  await redisClient.connect();

  console.log("Redis connected");
};


const getOrSet = async(key , ttl , func) => {
  const cacheData = await redisClient.get(key);

  if(cacheData)return cacheData;

  const data = await func();

  

  redisClient.setex(key , ttl , JSON.stringify(data));

  return data;
}

module.exports = {
  redisClient,
  connectRedis,
  getOrSet
};