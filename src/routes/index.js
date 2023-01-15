module.exports = (app) => {
  app.use("/admin", require("./admin"));
}