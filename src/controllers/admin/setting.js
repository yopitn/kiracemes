const fs = require("fs");
const path = require("path");
const logger = require("../../libs/logger");
const service = require("../../services");
const util = require("../../utils");

exports.index = async (req, res) => {
  try {
    const { user_id } = req;
    const setting = await util.getSetting();
    const user = await service.users.findById(user_id);

    res.render("admin/setting", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: Setting`,
      },
      view: {
        isHomepage: true,
        isPosts: false,
        isPages: false,
        isSetting: false,
        isProfile: false,
        isSetting: true,
        isEditor: false,
        isPostCreate: false,
        isPostUpdate: false,
        isPageCreate: false,
        isPageUpdate: false,
        isError: false,
      },
      user: user,
      setting: setting,
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.update = async (req, res) => {
  try {
    const settings = req.body.settings;

    settings.forEach(async (setting) => {
      await service.settings.update(setting);
    });

    res.sendStatus(200);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.getFavicon = async (req, res) => {
  try {
    const dir = path.join(__dirname, "../../../public/favicon.ico");
    const favicon = fs.readFileSync(dir);
    res.writeHead(200, {
      "Content-Type": "image/x-icon",
    });

    res.end(favicon);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.updateFavicon = async (req, res) => {
  try {
    await util.uploadFavicon(req, res, (error) => {
      if (error)
        return res.status(400).json({
          errors: [
            {
              message: error.message,
            },
          ],
        });

      return res.sendStatus(200);
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.getRobotsTxt = async (req, res) => {
  try {
    const dir = path.join(__dirname, "../../../public/robots.txt");
    const string = fs.readFileSync(dir, {
      encoding: "utf-8",
    });

    res.status(200).json({
      text: string,
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.updateRobotsTxt = async (req, res) => {
  try {
    const dir = path.join(__dirname, "../../../public/robots.txt");
    const string = req.body.robots_txt;

    fs.writeFileSync(dir, string, {
      encoding: "utf-8",
    });

    res.sendStatus(200);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
