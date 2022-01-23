const mongoose = require("mongoose");

const connection = () => {
  console.log("Foi");
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("DB running");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connection;
