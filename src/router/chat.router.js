// declare library
const express = require("express");
const {
  destroy,
  deleteConversation,
} = require("../controller/chat.controller");

// buat variabel dengan memanggil library express router
const router = express.Router();

router.delete("/chats/delete/:id", destroy);

module.exports = router; // harus di ekspor agar bisa dipanggil di index
