const { getList, getDetail } = require("../controller/blog");
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
        return { msg: "新增博客" };
      case "/api/blog/update":
        return { msg: "更新博客" };
      case "/api/blog/del":
        return { msg: "删除博客" };
      default:
        break;
    }
  }
};