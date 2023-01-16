const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models");

exports.create = async (body) => {
  try {
    const user = await model.users.findOne({
      where: {
        username: body.username,
      },
    });

    if (user && body.password) {
      const match = await bcrypt.compare(body.password, user.password);

      if (user && match) {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            role: user.role,
          },
          process.env.KEY_TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "6h",
          }
        );

        const session = await model.sessions.findOne({
          where: {
            user_id: user.id,
          },
        });

        if (session) {
          await model.sessions.update(
            {
              token: token,
              updated_at: new Date(),
            },
            {
              where: {
                user_id: user.id,
              },
            }
          );
        } else {
          await model.sessions.create({
            user_id: user.id,
            token: token,
          });
        }

        return token;
      }

      return null;
    }

    return null;
  } catch (error) {
    throw new Error(error);
  }
};

exports.destroy = async (token) => {
  try {
    await model.sessions.destroy({
      where: {
        token: token,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
