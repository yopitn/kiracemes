const service = require("../../services");

exports.destroy = async (req, res) => {
  try {
    const token = req.cookies["kiracemes-session"];

    await service.sessions.destroy(token);

    res.clearCookie["kiracemes-session"];

    res.redirect("/");
  } catch (error) {
    throw new Error(error);
  }
};
