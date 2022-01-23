const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String, required: false },
    key: { type: String, required: false },
  },
  { timestamps: true }
);

//Rodar antes dos dados
userSchema.pre("save", function (next) {
  if (this.isNew || this.idModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) next(err);
      else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});


module.exports = mongoose.model("User", userSchema);
