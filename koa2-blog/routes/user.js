const router = require("koa-router")();
router.prefix("/api/user");
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const res = await login(username, password);
  if (!res.username) {
    ctx.body = new ErrorModel("登录失败");
    return;
  }
  ctx.session.username = res.username;
  ctx.session.realname = res.realname;
  ctx.body = new SuccessModel(res);
});

module.exports = router;
