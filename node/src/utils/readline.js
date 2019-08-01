const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 文件地址
const fileName = path.join(__dirname, "../../logs", "access.log");

// 创建 read stream
const readStream = fs.createReadStream(fileName);

// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
});

// 逐行读取
rl.on("line", lineData => {
  if (!lineData) {
    return;
  }

  const [method, url, userAgent, date] = lineData.split(" -- ");
  console.log("method:", method);
  console.log("url:", url);
  console.log("userAgent", userAgent);
  console.log("date", new Date(+date).toString());
});

rl.on("close", () => {
  console.log("读取完成");
});
