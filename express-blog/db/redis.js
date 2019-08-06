const redis = require("redis");
const { REIDS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REIDS_CONF.port, REIDS_CONF.host);

redisClient.on("error", err => {
  console.log(err);
});

module.exports = redisClient;
