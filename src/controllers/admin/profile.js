const bcrypt = require("bcrypt");
const logger = require("../../libs/logger");
const service = require("../../services");
const util = require("../../utils");

exports.index = async (req, res) => {
  try {
    const { user_id } = req;
    const user = await service.users.findById(user_id);
    const setting = await util.getSetting();

    res.render("admin/profile", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: Profile`,
      },
      view: {
        isHomepage: true,
        isPosts: false,
        isPages: false,
        isProfile: false,
        isSetting: false,
        isProfile: true,
        isEditor: false,
        isPostCreate: false,
        isPostUpdate: false,
        isPageCreate: false,
        isPageUpdate: false,
        isError: false,
      },
      user: user,
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.update = async (req, res) => {
  try {
    const { body, user_id } = req;

    const user = {
      username: body.username,
      name: body.name,
      email: body.email,
      bio: body.bio,
      location: body.location,
    };

    await service.users.update(user, user_id);

    res.sendStatus(200);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { user_id } = req;
    const setting = await util.getSetting();

    await util.uploadUserImage(req, res, async (error) => {
      if (error)
        return res.status(400).json({
          errors: [
            {
              message: error.message,
            },
          ],
        });

      const image = `${setting.homeurl}/content/images/users/${req.file.filename}`;

      await service.users.image(image, user_id);

      res.sendStatus(200);
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { body, user_id } = req;
    const user = await service.users.findById(user_id);
    const match = await bcrypt.compare(body.old_password, user.password);

    let password;

    if (match) {
      password = body.new_password;
    } else {
      return res.status(400).json({
        errors: [
          {
            message: "The old password is incorrect. Try again",
          },
        ],
      });
    }

    if (body.new_password !== body.verify_password) {
      return res.status(400).json({
        errors: [
          {
            message: "New password do not match",
          },
        ],
      });
    }

    await service.users.password(password, user_id);

    return res.sendStatus(200);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
