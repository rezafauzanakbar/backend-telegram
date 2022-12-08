const db = require("../config/db");

module.exports = {
  store: (data) => {
    const { sender, receiver, message } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO chats (sender, receiver, message, date_created) 
            VALUES (${sender}, ${receiver}, '${message}', now())`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  deleteChat: (id_chats) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM chats WHERE id_chats='${id_chats}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  deleteConversation: (sender, receiver) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM chats WHERE sender='${sender}' and receiver='${receiver}' or sender='${sender}' and receiver='${receiver}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  list: (sender, receiver) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT chats.id_chats, chats.message, userSender.username AS sender, userReceiver.username AS receiver, chats.date_created
            FROM chats
            LEFT JOIN users AS userSender ON chats.sender=userSender.id_user
            LEFT JOIN users AS userReceiver ON chats.receiver=userReceiver.id_user
            WHERE
            (sender=${sender} AND receiver=${receiver})
            OR (sender=${receiver} AND receiver=${sender})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};
