// declare library
const express = require("express");
const {
  list,
  detail,
  update,
  listchat,
  updatePhoto,
} = require("../controller/user.controller");
const { register, login } = require("../controller/auth.controller");

// buat variabel dengan memanggil library express router
const router = express.Router();
const uploadPhoto = require("../middleware/uploadPhoto");
const deletePhoto = require("../middleware/deletePhoto");

const jwtAuth = require("../middleware/jwtAuth");

router
  .get("/user", list)
  .get("/user/detail/:id", detail)
  .get("/user/chat", listchat)
  .put("/user/:id", update)
  .put("/user/photo/:id", deletePhoto, uploadPhoto, updatePhoto)
  //register
  .post("/register", register)
  //login
  .post("/login", login);

module.exports = router; // harus di ekspor agar bisa dipanggil di index
