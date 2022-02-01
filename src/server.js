const app = require("./app");

app.listen(process.env.PORT || 80, () => {
  console.log("App running");
});
