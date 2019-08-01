const fs = require("fs");
const path = require("path");

// 生成 write Stream
function createWriteStream(filename) {
  const fullFileName = path.join(__dirname, "../../logs", filename);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: "a"
  });
  return writeStream;
}

// 写访问日志
const accessWriteStream = createWriteStream("access.log");
function access(log) {
  if (process.env.NODE_ENV === "production") {
    accessWriteStream.write(log + "\n");
    return;
  }
  console.log(log);
}

module.exports = {
  access
};
