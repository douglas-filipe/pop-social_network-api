const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./database/connection");
const User = require("./routes/user");
const Post = require("./routes/post");

const app = express();

connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Está funcionando");
});
app.use("/users", User);
app.use("/post", Post);

module.exports = app;
