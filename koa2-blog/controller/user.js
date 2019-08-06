const { exec, escape } = require("../db/mysql");

exports.login = async (username, password) => {
  username = escape(username);
  password = escape(password);
  const sql = `
    select username, realname from users where username=${username} and password=${password};
  `;
  const data = await exec(sql);
  return data[0] || {};
};
