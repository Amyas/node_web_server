const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

module.exports = (req, res) => {
  const method = req.method;
  const path = req.path;

  if (method === "POST" && path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);
    if (result) {
      return new SuccessModel();
    }
    return new ErrorModel("登录失败");
  }
};
