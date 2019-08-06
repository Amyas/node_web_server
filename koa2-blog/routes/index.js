const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  ctx.body = "hello koa 2";
});

module.exports = router;
