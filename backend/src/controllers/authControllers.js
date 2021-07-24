const db = require("../models");
const config = require("../configs/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const register = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => {
      res.status(200).send({
        message: "Akun telah terdaftar!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Email Tidak Ditemukan!",
        });
      }

      var validatePass = bcrypt.compareSync(req.body.password, user.password);
      if (!validatePass) {
        return res.status(401).send({
          accessToken: null,
          message: "Password Salah!",
        });
      }

      var payload = { userId: user.id };
      var token = jwt.sign(payload, config.secret, {
        expiresIn: "1h",
      });

      res.status(200).send({
        name: user.name,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = {
  register,
  login,
};
