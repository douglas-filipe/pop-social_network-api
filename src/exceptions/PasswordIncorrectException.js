function PasswordIncorrectException(message, status) {
  this.message = message;
  this.status = status
}

module.exports = { PasswordIncorrectException };
