var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const fs = require("fs");

var indexRouter = require("./routes/index");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

var app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(logger("dev"));
} else {
  const logFilename = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFilename, {
    flags: "a"
  });
  app.use(
    logger("combined", {
      stream: writeStream
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient = require("./db/redis");
const sessionStore = new RedisStore({
  client: redisClient
});

app.use(
  session({
    secret: "amyas",
    cookie: {
      // path: "/", //默认配置
      // httpOnly: true, //默认配置
      maxAge: 24 * 60 * 60 * 1000 //24小时
    },
    store: sessionStore
  })
);

app.use("/", indexRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.error);
});

module.exports = app;
