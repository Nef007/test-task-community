const bodyParser = require("body-parser");
const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const fileUpload = require("express-fileupload");
const loginValidation = require("../utils/validations/login");
const registerValidation = require("../utils/validations/registration");
const path = require("path");
const cors = require("cors");

const UserCtrl = require("../controllers/UserController");

const createRoutes = (app) => {
  const UserController = new UserCtrl();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static(__dirname + "/../static"));
  app.use(fileUpload({}));

  app.get("/api/user/me", checkAuth, UserController.me);
  app.post("/api/user/register", registerValidation, UserController.register);
  app.post("/api/user/login", loginValidation, UserController.login);
  app.put("/api/photo", checkAuth, UserController.changePhoto);
  app.put("/api/user", checkAuth, UserController.change);
  app.post("/api/users", checkAuth, UserController.users);

  if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "../client", "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    });
  }
};

module.exports = createRoutes;
