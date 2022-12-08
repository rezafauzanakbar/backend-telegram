const userModel = require("../model/user.model");
const { success, failed, succesWithToken } = require("../helper/response");

//deklare bcyrpt

const bcyrpt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");

module.exports = {
  register: (req, res) => {
    try {
      //tangkap data dari body
      const { full_name, username, email, password } = req.body;
      // const gambar = req.file.filename;
      bcyrpt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "fail hash password");
        }
        //console.log(hash)
        const data = {
          full_name,
          username,
          email,
          password: hash,
          photo: req.file ? req.file.filename : "default.png",
        };
        userModel
          .register(data)
          .then((result) => {
            success(res, result, "success", "register success");
          })
          .catch((err) => {
            failed(res, err.message, "failed", "register failed");
          });
      });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },

  login: (req, res) => {
    const { email, password } = req.body;
    userModel
      .checkUsername(email)
      .then((result) => {
        // console.log(res.rows[0]);
        const user = result.rows[0];
        if (result.rowCount > 0) {
          bcyrpt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result) {
                const token = await jwtToken({
                  email: user.email,
                });
                // console.log(token);
                succesWithToken(
                  res,
                  { token, data: user },
                  "success",
                  "login success"
                );
              } else {
                //ketika password salah
                failed(res, null, "failed", "email atau password salah");
              }
            });
        } else {
          //ketika email salah
          failed(res, null, "failed", "email atau password salah");
        }
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },
};
