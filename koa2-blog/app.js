const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const { REIDS_CONF } = require("./conf/db");
const path = require("path");
const fs = require("fs");
const morgan = require("koa-morgan");

const index = require("./routes/index");
const blog = require("./routes/blog");
const user = require("./routes/user");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  const logFilename = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFilename, {
    flags: "a"
  });
  app.use(
    morgan("combined", {
      stream: writeStream
    })
  );
}

// session 配置
app.keys = ["amyas"];
app.use(
  session({
    // 配置cookie
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    // 配置redis
    store: redisStore({
      all: `${REIDS_CONF.host}:${REIDS_CONF.port}`
    })
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
