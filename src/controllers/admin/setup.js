const logger = require("../../libs/logger");
const service = require("../../services");

exports.index = async (req, res) => {
  try {
    res.render("./admin/setup", {
      blog: {
        title: "Kiracemes",
        homepageUrl: `${req.protocol}://${req.headers.host}`,
        pageTitle: `Kiracemes: Setup`,
      },
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.create = (req, res) => {
  try {
    const { body } = req;

    const user = {
      username: body.username,
      name: body.name,
      email: body.email,
      password: body.password,
      slug: body.name,
      role: "admin",
    };

    service.users.create(user);

    const settings = [
      { name: "url", value: `${req.protocol}://${req.headers.host}` },
      { name: "homeurl", value: `${req.protocol}://${req.headers.host}` },
      { name: "title", value: body.blogname },
      { name: "description", value: "A sample description blog" },
      { name: "meta_title", value: body.blogname },
      { name: "meta_description", value: null },
      { name: "language", value: "en" },
      { name: "posts_per_page", value: "10" },
      { name: "timezone", value: "+07:00" },
    ];

    settings.forEach(async (setting) => {
      await service.settings.create(setting);
    });

    res.redirect("/admin/signin");
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
