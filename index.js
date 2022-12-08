// declare library
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const socket = require("socket.io");
const socketController = require("./src/socket/index");

// buat route
const userRouter = require("./src/router/user.router");
const chatRouter = require("./src/router/chat.router");

const http = require("http");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(xss());
app.use(cors());
app.get("/ping", (req, res) => {
  res.json({
    message: "PONG",
  });
});
app.use(chatRouter);
app.use(userRouter);

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("new user connect");

  socketController(io, socket);
});

const APP_PORT = process.env.PORT || 3005;

server.listen(APP_PORT, () => {
  console.log("listening on port" + APP_PORT);
});
