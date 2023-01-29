const service = require("../../../services");

exports.create = async (req, res) => {
  try {
    const { body } = req;

    const token = await service.sessions.create(body);

    res.status(200).json({
      token: token,
    });
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
