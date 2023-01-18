const model = require("../models");

exports.create = async (body) => {
  try {
    await model.settings.create({
      name: body.name,
      value: body.value,
    });
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
};
