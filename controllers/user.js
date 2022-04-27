const jwt = require("../services/jwt");
const bycript = require("bcrypt-nodejs");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

function signUp(req, res) {
  const user = new User();
  const { email, password, repeatPassword } = req.body;
  user.email = email.toLowerCase();

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las Contraseñas son Obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseña no coinciden" });
    } else {
      bycript.hash(password, null, null, function (err, hash) {
        if (err) {
          res.status(500).send({ message: "Error al Encriptar la contraseña" });
        } else {
          user.password = hash;
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe" });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error al Crear el usuario" });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
      //res.status(200).send({message: "Usuatio Creado"});
    }
  }
}

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const pass = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else {
        bycript.compare(pass, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "error del servidor" });
          } else if (!check) {
            res.status(500).send({ message: "Contraseña Incorrecta" });
          } else {
            res.status(200).send({
              accessToken: jwt.createAccessToken(userStored),
              refreshToken: jwt.createRefreshToken(userStored),
            });
          }
        });
      }
    }
  });
}

module.exports = {
  signUp,
  signIn,
};
