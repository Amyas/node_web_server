const redis = require("redis");
const { REIDS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REIDS_CONF.port, REIDS_CONF.host);

redisClient.on("error", err => {
  console.log(err);
});

function set(key, val) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
      resolve(val);
    });
  });
}

module.exports = {
  set,
  get
};
