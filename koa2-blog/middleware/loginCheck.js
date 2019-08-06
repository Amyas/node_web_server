const { ErrorModel } = require("../model/resModel");

module.exports = async (req, res, next) => {
  if (!req.session.username) {
    ctx.body = new ErrorModel("未登录");
    return;
  }
  await next();
};
