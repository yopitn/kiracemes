const service = require("../../services");

exports.index = (req, res) => {
  try {
    res.render("admin/signin", {
      message: req.flash("message"),
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { body } = req;

    const token = await service.sessions.create(body);

    if (token) {
      res.cookie("kiracemes-session", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });

      res.redirect("/admin/posts");
    } else {
      req.flash("message", "Username or password is incorrect");
      res.redirect("/admin/signin");
    }
  } catch (error) {
    throw new Error(error);
  }
};
