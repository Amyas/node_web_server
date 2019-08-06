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

router.get("/list", (req, res, next) => {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  return getList(author, keyword).then(data => {
    res.json(new SuccessModel(data));
  });
});

router.get("/detail", (req, res, next) => {
  res.json({
    errno: 0,
    data: "ok"
  });
});

module.exports = router;
