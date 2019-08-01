const querystring = require("querystring");
const { get, set } = require("./src/db/redis");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// 处理postData
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    const contentType = req.headers["content-type"].toLowerCase();
    if (contentType.indexOf("application/json") === -1) {
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

// cookie 过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

const serverHandle = async (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-Type", "application/json");

  // 获取 path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析 query
  req.query = querystring.parse(url.split("?")[1]);

  // 解析 cookie
  req.cookie = {};
  const cookie = req.headers.cookie || "";
  cookie.split(";").forEach(item => {
    if (!item) return;

    const [key, val] = item.split("=");
    req.cookie[key] = val;
  });

  // 解析 session 使用 redis
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化 redis 中的 session 值
    set(userId, {});
  }

  // 获取 session
  req.sessionId = userId;
  const sessionData = await get(req.sessionId);
  if (sessionData == null) {
    // 初始化 redis 中的 session 值
    set(req.sessionId, {});
    // 设置 session
    req.session = {};
  } else {
    req.session = sessionData;
  }

  // 处理 post data
  const postData = await getPostData(req);
  req.body = postData;

  const blogResult = handleBlogRouter(req, res);
  if (blogResult) {
    blogResult.then(data => {
      if (needSetCookie) {
        res.setHeader(
          "Set-Cookie",
          `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
        );
      }
      res.end(JSON.stringify(data));
    });
    return;
  }

  const userRusult = handleUserRouter(req, res);
  if (userRusult) {
    userRusult.then(data => {
      if (needSetCookie) {
        res.setHeader(
          "Set-Cookie",
          `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
        );
      }
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
