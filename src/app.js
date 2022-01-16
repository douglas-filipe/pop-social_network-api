const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./routes/user");
const Post = require("./routes/post");
const mongoose = require("mongoose");

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("DB running");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Está funcionando");
});
app.use("/users", User);
app.use("/post", Post);

app.listen(process.env.PORT || 3000, () => {
  console.log("App running: " + 3000);
});
