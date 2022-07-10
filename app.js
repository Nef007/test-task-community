const express = require("express");
const dotenv = require("dotenv");
const { createServer } = require("http");
const mongoose = require("mongoose");

dotenv.config();

const createRoutes = require("./core/routes");

const app = express();
const http = createServer(app);

createRoutes(app);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.NODE_ENV);
    http.listen(process.env.PORT, function () {
      console.log(`Сервер запушен на http://localhost:${process.env.PORT}`);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

connect();
