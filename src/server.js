const { server } = require("./app");

server.listen(process.env.PORT || 3000, () => {
  console.log("App running");
});
