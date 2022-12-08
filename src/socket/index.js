const { store, list, listWithLimit } = require("../model/chat.model");

module.exports = (io, socket) => {
  socket.on("ping", (data) => {
    socket.emit("ping-response", data);
  });
  // private chat
  socket.on("join-room", (data) => {
    const { id_user, full_name, username, email, phone, password, bio } = data;
    socket.join(id_user);
  });

  // send messages
  socket.on("send-message", (data) => {
    console.log(data);
    store(data)
      .then(async () => {
        const listChats = await list(data.sender, data.receiver);
        io.to(data.receiver).emit("send-message-response", listChats.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // send messages with limit
  socket.on("send-message-with-limit", (data) => {
    console.log(data);
    store(data)
      .then(async () => {
        const listChatsLimit = await listWithLimit(data.sender, data.receiver);
        io.to(data.receiver).emit("send-message-response", listChatsLimit.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //history chat
  socket.on("chat-history", async (data) => {
    console.log(data);
    try {
      const listChats = await list(data.sender, data.receiver);
      io.to(data.sender).emit("send-message-response", listChats.rows);
    } catch (err) {
      console.log("Error chat-history");
    }
  });
};
