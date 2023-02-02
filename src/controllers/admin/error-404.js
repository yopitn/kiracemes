const logger = require("../../libs/logger");
const service = require("../../services");
const util = require("../../utils");

module.exports = async (req, res) => {
  try {
    const { user_id } = req;
    const setting = await util.getSetting();
    const user = await service.users.findById(user_id);

    res.render("admin/error-404", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: Pages`,
      },
      view: {
        isHomepage: true,
        isPosts: false,
        isPages: false,
        isSetting: false,
        isProfile: false,
        isSetting: false,
        isEditor: false,
        isPostCreate: false,
        isPostUpdate: false,
        isPageCreate: false,
        isPageUpdate: false,
        isError: true,
      },
      user: user,
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
