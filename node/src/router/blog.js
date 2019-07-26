module.exports = (req, res) => {
  const method = req.method;
  const path = req.path;

  if (method === "GET") {
    switch (path) {
      case "/api/blog/list":
        return { msg: "获取博客列表" };
      case "/api/blog/detail":
        return { msg: "获取博客详情" };
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
