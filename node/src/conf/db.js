const env = process.env.NODE_ENV; // 环境变量

let MYSQL_CONF;
let REIDS_CONF;

if (env === "development") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "myblog"
  };

  REIDS_CONF = {
    host: "localhost",
    port: 6379
  };
}

if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "myblog"
  };

  REIDS_CONF = {
    host: "localhost",
    port: 6379
  };
}

module.exports = {
  MYSQL_CONF,
  REIDS_CONF
};
