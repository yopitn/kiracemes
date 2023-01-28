const controller = require("../controllers");
const middleware = require("../middlewares");

module.exports = (app) => {
  app.use("/", require("./blog"));
  app.use("/admin", require("./admin"));
  app.use("/api", require("./api"));

  app.use(middleware.admin.isSetup, (req, res) => {
    if (!res.headersSend) {
      const urlPath = req.originalUrl.split("/")[1];

      if (urlPath === "admin") {
        res.send("Error for admin");
      } else {
        return controller.blog.error404(req, res);
      }
    }
  });
};
