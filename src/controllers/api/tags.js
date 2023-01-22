const service = require("../../services");

exports.search = async (req, res) => {
  try {
    const { query } = req;

    const tags = await service.tags.search(query.q);

    res.status(200).json({
      tags: tags,
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
