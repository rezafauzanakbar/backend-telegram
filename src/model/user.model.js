const db = require("../config/db");

const userModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  // router details
  selectDetail: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id_user=${id_user}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  // router update
  update: (id_user, full_name, username, email, phone, password, bio) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET
        full_name = COALESCE($1, full_name),
        username = COALESCE($2, username),
        email = COALESCE($3, email),
        phone = COALESCE($4, phone),
        password = COALESCE($5, password),
        bio = COALESCE($6, bio)
        WHERE id_user = $7`,
        [full_name, username, email, phone, password, bio, id_user],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  //get chat
  listChat: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT DISTINCT ON (involved) involved as userid, u.full_name as fullname, message, s.date_created FROM (SELECT c.*, case sender when 1 then receiver else sender end as involved from chats c where c.sender = 1 or c.receiver = 1) s join users u on s.involved = u.id_user order by involved, s.date_created desc;`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updatePhoto: (id_user, photo) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET photo = '${photo}' WHERE id_user = ${id_user}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //model register
  register: ({ full_name, username, email, password, photo }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (full_name, username, email, password, photo, date_created) VALUES ('${full_name}', '${username}', '${email}', '${password}', '${photo}', now())`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  //model login
  checkUsername: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = userModel;
