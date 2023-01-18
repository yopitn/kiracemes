const settings = require("../../utils/settings");

exports.index = async (req, res) => {
  try {
    const setting = await settings();

    res.render("admin/posts", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: Posts`,
      },
      view: {
        isHomepage: true,
        isPosts: true,
        isPages: false,
        isSetting: false,
        isEditor: false,
        isError: false,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = async (req, res) => {
  try {
    const setting = await settings();

    res.render("admin/editor", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: New Post`,
      },
      view: {
        isHomepage: false,
        isPosts: false,
        isPages: false,
        isSetting: false,
        isEditor: true,
        isError: false,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
