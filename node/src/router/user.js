module.exports = (req, res) => {
  const method = req.method;
  const path = req.path;

  if (method === "POST" && path === "/api/user/login") {
    return { msg: "获取博客列表" };
  }
};
