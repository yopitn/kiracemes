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
    throw new Error(error);
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
    throw new Error(error);
  }
};

exports.image = async (req, res) => {
  try {
    const { user_id } = req;
    const setting = await util.getSetting();
    const month = ("0" + (new Date().getMonth() + 1)).slice(-2).toString();
    const year = new Date().getFullYear().toString();

    await util.uploadImage(req, res, async (error) => {
      if (error)
        return res.status(400).json({
          errors: [
            {
              message: error.message,
            },
          ],
        });

      const image = `${setting.homeurl}/content/images/${year}/${month}/${req.file.filename}`;

      await service.users.image(image, user_id);

      res.sendStatus(200);
    });
  } catch (error) {
    throw new Error(error);
  }
};
