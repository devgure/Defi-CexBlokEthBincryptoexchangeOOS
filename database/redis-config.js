const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// Cache market data
const cacheMarketData = (symbol, data) => {
  client.setex(`market:${symbol}`, 60, JSON.stringify(data)); // Cache for 1 minute
};

const getCachedMarketData = (symbol) => {
  return new Promise((resolve, reject) => {
    client.get(`market:${symbol}`, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

// Cache user session
const cacheUserSession = (userId, session) => {
  client.setex(`session:${userId}`, 3600, JSON.stringify(session)); // Cache for 1 hour
};

const getCachedUserSession = (userId) => {
  return new Promise((resolve, reject) => {
    client.get(`session:${userId}`, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

module.exports = {
  client,
  cacheMarketData,
  getCachedMarketData,
  cacheUserSession,
  getCachedUserSession,
};
