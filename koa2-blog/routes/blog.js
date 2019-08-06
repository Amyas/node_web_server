const router = require("koa-router")();
router.prefix("/api/blog");
const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  removeBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

router.get("/list", async (ctx, next) => {
  const query = ctx.query;
  let author = query.author || "";
  const keyword = query.keyword || "";

  if (query.isadmin) {
    // 管理员界面
    if (!ctx.session.username) {
      // 未登录
      ctx.body = new ErrorModel("未登录");
      return;
    }
    // 强制查询自己的博客
    author = ctx.session.username;
  }

  const res = await getList(author, keyword);
  ctx.body = new SuccessModel(res);
});

router.get("/detail", async (ctx, next) => {
  const res = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(res);
});

router.post("/new", loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username;
  const res = await createBlog(ctx.request.body);
  ctx.body = new SuccessModel(res);
});

router.post("/update", loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username;
  const res = await updateBlog(ctx.query.id, ctx.request.body);
  if (!res) {
    ctx.body = new ErrorModel("更新失败");
    return;
  }
  ctx.body = new SuccessModel("更新成功");
});

router.post("/del", loginCheck, async (ctx, next) => {
  ctx.query.author = ctx.session.username;
  const res = removeBlog(ctx.query.id, ctx.query.author);
  if (!res) {
    ctx.body = new ErrorModel("删除失败");
    return;
  }
  ctx.body = new SuccessModel("删除成功");
});

module.exports = router;
