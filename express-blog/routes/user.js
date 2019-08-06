const express = require("express");
const router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  return login(username, password).then(data => {
    if (data.username) {
      // 设置 session
      req.session.username = data.username;
      req.session.realname = data.realname;

      res.json(new SuccessModel(data));
      return;
    }
    res.json(new ErrorModel("登录失败"));
  });
});

module.exports = router;
