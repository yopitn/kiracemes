const util = require("../../../utils");

exports.upload = async (req, res) => {
  try {
    const setting = await util.getSetting();
    const month = ("0" + (new Date().getMonth() + 1)).slice(-2).toString();
    const year = new Date().getFullYear().toString();

    await util.uploadImage(req, res, (error) => {
      if (error)
        return res.status(400).json({
          errors: [
            {
              message: error.message,
            },
          ],
        });

      const url = `${setting.homeurl}/content/images/${year}/${month}/${req.file.filename}`;

      res.status(201).json({
        images: [
          {
            url: url,
            ref: req.file.filename,
          },
        ],
      });
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
