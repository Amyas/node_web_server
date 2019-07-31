const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  removeBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

module.exports = (req, res) => {
  const method = req.method;
  const path = req.path;

  if (method === "GET" && path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    return getList(author, keyword).then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === "GET" && path === "/api/blog/detail") {
    const id = req.query.id;
    return getDetail(id).then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === "POST" && path === "/api/blog/new") {
    return createBlog(req.body).then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === "POST" && path === "/api/blog/update") {
    return updateBlog(req.query.id, req.body).then(data => {
      if (data) {
        return new SuccessModel("更新成功");
      }
      return new ErrorModel("更新失败");
    });
  }

  if (method === "POST" && path === "/api/blog/del") {
    return removeBlog(req.query.id, req.query.author).then(data => {
      if (data) {
        return new SuccessModel("删除成功");
      }
      return new ErrorModel("删除失败");
    });
  }
};
