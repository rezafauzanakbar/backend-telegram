const chatModel = require("../model/chat.model");
const { success, failed } = require("../helper/response");

const chatController = {
  destroy: (req, res) => {
    const id_chats = req.params.id;
    chatModel
      .deleteChat(id_chats)
      .then((result) => {
        success(res, result.rowCount, "success", "Delete chats Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to delete chats");
      });
  },
  deleteConversation: (req, res) => {
    const sender = req.query.sender;
    const receiver = req.query.receiver;
    chatModel
      .deleteConversation(sender, receiver)
      .then((result) => {
        success(res, result.rowCount, "success", "Delete conversation Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to conversation");
      });
  },
};

module.exports = chatController;
