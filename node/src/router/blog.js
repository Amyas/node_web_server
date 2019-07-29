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

  if (method === "GET") {
    switch (path) {
      case "/api/blog/list":
        const author = req.query.author || "";
        const keyword = req.query.keyword || "";
        const listData = getList(author, keyword);
        return new SuccessModel(listData);

      case "/api/blog/detail":
        const id = req.query.id;
        const data = getDetail(id);
        return new SuccessModel(data);
      default:
        break;
    }
  }

  if (method === "POST") {
    switch (path) {
      case "/api/blog/new":
        const data = createBlog(req.body);
        return new SuccessModel(data);
      case "/api/blog/update":
        const result = updateBlog(req.query.id, req.body);
        if (result) {
          return new SuccessModel();
        } else {
          return new ErrorModel("更新博客失败");
        }
      case "/api/blog/del":
        const delResult = removeBlog(req.query.id);
        if (delResult) {
          return new SuccessModel();
        } else {
          return new ErrorModel("删除博客失败");
        }
      default:
        break;
    }
  }
};
