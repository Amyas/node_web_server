const express = require("express");
const router = express.Router();

const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  removeBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

router.get("/list", (req, res, next) => {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  if (req.query.isadmin) {
    // 管理员界面
    if (!req.session.username) {
      // 未登录
      res.json(new ErrorModel("未登录"));
      return;
    }
    // 强制查询自己的博客
    author = req.session.username;
  }

  return getList(author, keyword).then(data => {
    res.json(new SuccessModel(data));
  });
});

router.get("/detail", (req, res, next) => {
  return getDetail(req.query.id).then(data => {
    res.json(new SuccessModel(data));
  });
});

router.post("/new", loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  return createBlog(req.body).then(data => {
    res.json(new SuccessModel(data));
  });
});

router.post("/update", loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  return updateBlog(req.query.id, req.body).then(data => {
    if (data) {
      res.json(new SuccessModel("更新成功"));
      return;
    }
    res.json(new ErrorModel("更新失败"));
  });
});

router.post("/del", loginCheck, (req, res, next) => {
  req.query.author = req.session.username;
  return removeBlog(req.query.id, req.query.author).then(data => {
    if (data) {
      res.json(new SuccessModel("删除成功"));
    }
    res.json(new ErrorModel("删除失败"));
  });
});

module.exports = router;
