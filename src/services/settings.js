const logger = require("../libs/logger");
const model = require("../models");

exports.create = async (body) => {
  try {
    await model.settings.create({
      name: body.name,
      value: body.value,
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.findByName = async (name) => {
  try {
    const setting = await model.settings.findOne({
      where: {
        name: name,
      },
    });

    return setting.value;
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

exports.update = async (body) => {
  try {
    await model.settings.update(
      {
        value: body.value,
      },
      {
        where: {
          name: body.name,
        },
      }
    );
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
