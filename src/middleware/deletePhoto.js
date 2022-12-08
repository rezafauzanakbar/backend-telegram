const fs = require("fs");
const userModel = require("../model/user.model");

const remove = async (req, res, next) => {
  const id = req.params.id;
  const data = await userModel.selectDetail(id);
  if (data) {
    if (data.rows[0].photo) {
      const img = data.rows[0].photo;
      if (img !== "default.png") {
        fs.unlink(`./public/foto user/${img}`, (err) => {
          if (err) {
            res.json({
              message: "delete failed",
              error: err,
            });
          }
        });
      }
      next();
    } else {
      res.json("There is no profile picture");
    }
  } else {
    res.json("user is not found");
  }
  // if (data.rows[0].photo) {
  //   const photo = data.rows[0].photo;
  //   fs.unlink(`./public/foto user/${photo}`, (err) => {
  //     if (err) {
  //       console.log(err);
  //       next();
  //     }
  //   });
  //   next();
  // } else {
  //   res.json("Not found image");
  // }
};

module.exports = remove;
