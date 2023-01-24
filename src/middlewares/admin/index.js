const model = require("../../models");
const jwt = require("jsonwebtoken");

exports.isLogin = (req, res, next) => {
  try {
    const token = req.cookies["kiracemes-session"];

    if (token) {
      jwt.verify(token, process.env.KEY_TOKEN_SECRET, async (error, decode) => {
        const session = await model.sessions.findOne({
          where: {
            token: token,
          },
        });

        if (!error && session) {
          req.user_id = decode.id;
          req.role = decode.role;
          req.name = decode.name;

          return next();
        } else {
          res.redirect("/admin/signin");
          return false;
        }
      });
    } else {
      res.redirect("/admin/signin");
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.isNotLogin = (req, res, next) => {
  try {
    const token = req.cookies["kiracemes-session"];

    if (!token) {
      return next();
    } else {
      jwt.verify(token, process.env.KEY_TOKEN_SECRET, async (error, decode) => {
        const session = await model.sessions.findOne({
          where: {
            token: token,
          },
        });

        if (!error && session) {
          req.user_id = decode.id;
          req.role = decode.role;
          req.name = decode.name;

          res.redirect("/admin");
          return false;
        } else {
          return next();
        }
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.isSetup = async (req, res, next) => {
  try {
    const admin = await model.users.findAll({
      where: {
        role: "admin",
      },
    });

    if (admin.length > 0) {
      return next();
    } else {
      res.redirect("/admin/setup");
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.isNotSetup = async (req, res, next) => {
  try {
    const admin = await model.users.findAll({
      where: {
        role: "admin",
      },
    });

    if (admin.length > 0) {
      res.redirect("/admin");
    } else {
      return next();
    }
  } catch (error) {
    throw new Error(error);
  }
};
