const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  removeBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 统一的登录验证函数
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

module.exports = (req, res) => {
  const method = req.method;
  const path = req.path;

  if (method === "GET" && path === "/api/blog/list") {
    let author = req.query.author || "";
    const keyword = req.query.keyword || "";
    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult;
      }
      // 强制查询自己的博客
      author = req.session.username;
    }
    return getList(author, keyword).then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === "GET" && path === "/api/blog/detail") {
    return getDetail(req.query.id).then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === "POST" && path === "/api/blog/new") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    req.body.author = req.session.username;
    return createBlog(req.body).then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === "POST" && path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    req.body.author = req.session.username;
    return updateBlog(req.query.id, req.body).then(data => {
      if (data) {
        return new SuccessModel("更新成功");
      }
      return new ErrorModel("更新失败");
    });
  }

  if (method === "POST" && path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    req.query.author = req.session.username;
    return removeBlog(req.query.id, req.query.author).then(data => {
      if (data) {
        return new SuccessModel("删除成功");
      }
      return new ErrorModel("删除失败");
    });
  }
};
