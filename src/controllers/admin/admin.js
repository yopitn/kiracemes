const logger = require("../../libs/logger");

exports.index = (req, res) => {
  try {
    res.redirect("/admin/posts");
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
