module.exports = (app) => {
  app.use("/", require("./blog"));
  app.use("/admin", require("./admin"));
  app.use("/api", require("./api"));
};
