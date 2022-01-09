const nodemailer = require("nodemailer");
require("dotenv").config();

const resetPassword = (emailUsuario, newPassword) => {
  const remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  const emailRecuperate = {
    from: process.env.email,
    to: emailUsuario,
    subject: "Recuperação de senha",
    text: `Ola, sua nova senha é: ${newPassword}`,
  };
  remetente.sendMail(emailRecuperate, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = resetPassword