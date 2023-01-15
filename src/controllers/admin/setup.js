const service = require("../../services");

exports.index = async (req, res) => {
  try {
    res.render("./admin/setup");
  } catch (error) {
    throw new Error(error);
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

    res.redirect("/admin/signin");
  } catch (error) {
    throw new Error(error);
  }
};
