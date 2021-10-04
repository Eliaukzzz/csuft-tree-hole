const user = require("./user");
const comment = require("./comment");
module.exports = (app) => {
  app.use("/user", user);
  app.use("/comment", comment);
};
