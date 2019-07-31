const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// 处理postData
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandle = async (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-Type", "application/json");

  // 获取 path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析 query
  req.query = querystring.parse(url.split("?")[1]);

  // 处理 post data
  const postData = await getPostData(req);
  req.body = postData;

  const blogResult = handleBlogRouter(req, res);
  if (blogResult) {
    blogResult.then(data => {
      res.end(JSON.stringify(data));
    });
    return;
  }

  const userRusult = handleUserRouter(req, res);
  if (userRusult) {
    userRusult.then(data => {
      res.end(JSON.stringify(data));
    });
    return;
  }

  // 未命中路由，返回 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("404 Not Fount\n");
  res.end();
};

module.exports = serverHandle;
