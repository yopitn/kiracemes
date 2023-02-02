const logger = require("../../libs/logger");
const util = require("../../utils");

module.exports = async (req, res) => {
  try {
    const setting = await util.getSetting();

    res.render("blog/error-404", {
      blog: {
        title: setting.title,
        description: setting.description,
        homepageUrl: setting.homeurl,
        pageTitle: setting.title,
        meta_title: setting.meta_title,
        meta_description: setting.meta_description,
      },
      view: {
        isHomepage: false,
        isMultipleItems: false,
        isSingleItem: false,
        isPost: false,
        isPage: false,
        isSearch: false,
        isCategory: false,
        isAuthor: false,
        isError: true,
      },
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
