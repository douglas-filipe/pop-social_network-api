const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./database/connection");
const User = require("./routes/user");
const Post = require("./routes/post");
const http = require("http");
const socketIO = require("socket.io");

connection();

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  transports: ["polling"],
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("Teste", (teste) => {
    console.log(teste);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

app.set("socketio", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  res.send("Está funcionando");
});
app.use("/users", User);
app.use("/post", Post);

server.listen(process.env.PORT | 3000, () => {
  console.log("Server is running");
});
