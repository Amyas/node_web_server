const { exec } = require("../db/mysql");

exports.getList = async (author, keyword) => {
  // 1=1 占位置，避免后续 and 或者 order by 拼接错误
  let sql = `select * from blogs where 1=1`;
  if (author) {
    sql += ` and author='${author}'`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ` order by createtime desc;`;

  return await exec(sql);
};

exports.getDetail = async id => {
  let sql = `select * from blogs where id='${id}'`;
  const rows = await exec(sql);
  return rows[0];
};

exports.createBlog = async (data = {}) => {
  const { title, content, author } = data;
  const createtime = Date.now();

  let sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createtime}, '${author}');
  `;

  const insertData = await exec(sql);
  return insertData.insertId;
};

exports.updateBlog = async (id, data = {}) => {
  const { title, content, author } = data;
  let sql = `update blogs set title = '${title}', content = '${content}' where id = '${id}' and author = '${author}';`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
};

exports.removeBlog = async (id, author) => {
  let sql = `delete from blogs where id='${id}' and author = '${author}';`;
  const delData = await exec(sql);
  if (delData.affectedRows > 0) {
    return true;
  }
  return false;
};
