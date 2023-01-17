const jwt = require("jsonwebtoken");
const model = require("../../models");

exports.authAPIAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const authCookie = req.cookies["kiracemes-session"];

    let token;

    if (authHeader) {
      token = authHeader && authHeader.split(" ")[1];
    } else if (authCookie) {
      token = authCookie;
    }

    if (token) {
      jwt.verify(token, process.env.KEY_TOKEN_SECRET, async (error, decode) => {
        const session = await model.sessions.findOne({
          where: {
            token: token,
          },
        });

        if (!error && session) {
          req.body.user_id = decode.id;
          req.body.role = decode.role;
          req.body.name = decode.name;

          return next();
        } else {
          res.status(403).json({
            errors: [
              {
                message: "Forbidden",
              },
            ],
          });
        }
      });
    } else {
      res.status(401).json({
        errors: [
          {
            message: "Unauthorized",
          },
        ],
      });
    }
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};
