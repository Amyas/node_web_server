const { exec, escape } = require("../db/mysql");

exports.login = (username, password) => {
  username = escape(username);
  password = escape(password);
  const sql = `
    select username, realname from users where username=${username} and password=${password};
  `;
  return exec(sql).then(data => data[0] || {});
};
