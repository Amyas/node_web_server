const { exec } = require("../db/mysql");

exports.getList = (author, keyword) => {
  // 1=1 占位置，避免后续 and 或者 order by 拼接错误
  let sql = `select * from blogs where 1=1`;
  if (author) {
    sql += ` and author='${author}'`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ` order by createtime desc;`;

  return exec(sql);
};

exports.getDetail = id => {
  let sql = `select * from blogs where id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  });
};

exports.createBlog = (data = {}) => {
  const { title, content, author } = data;
  const createtime = Date.now();

  let sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createtime}, '${author}');
  `;

  return exec(sql).then(data => {
    return {
      id: data.insertId
    };
  });
};

exports.updateBlog = (id, data = {}) => {
  const { title, content } = data;
  let sql = `update blogs set title = '${title}', content = '${content}' where id = '${id}';`;
  return exec(sql).then(data => {
    if (data.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

exports.removeBlog = (id, author) => {
  let sql = `delete from blogs where id='${id}' and author = '${author}';`;
  return exec(sql).then(data => {
    if (data.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
