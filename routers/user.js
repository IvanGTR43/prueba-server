const express = require("express");
const userController = require("../controllers/user");
const multipart = require("connect-multiparty");

const md_auth = require("../middleware/authenticate");
const user = require("../models/user");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });

const api = express.Router();

api.post("/sign-up", userController.signUp);
api.post("/sign-in", userController.signIn);

module.exports = api;
