const userModel = require("../model/user.model");
const { success, failed } = require("../helper/response");

const userController = {
  list: async (req, res) => {
    const getUser = await userModel.selectAll();
    try {
      res.json(getUser.rows);
    } catch (err) {
      res.json(err);
    }
  },
  detail: async (req, res) => {
    // method untuk menampilkan hanya satu id
    const id_user = req.params.id;
    const getUser = await userModel.selectDetail(id_user);
    try {
      res.json(getUser.rows);
    } catch (err) {
      res.json(err);
    }
  },
  update: async (req, res) => {
    const { full_name, username, email, phone, password, bio } = req.body;
    const id_user = req.params.id;
    const getUser = await userModel.update(
      id_user,
      full_name,
      username,
      email,
      phone,
      password,
      bio
    );
    try {
      res.json(getUser);
    } catch (err) {
      res.json(err);
    }
  },

  listchat: async (req, res) => {
    const getUser = await userModel.listChat();
    try {
      res.json(getUser.rows);
    } catch (err) {
      res.json(err);
    }
  },

  updatePhoto: (req, res) => {
    const id_user = req.params.id;
    const photo = req.file.filename;
    userModel
      .updatePhoto(id_user, photo)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
};

module.exports = userController;
