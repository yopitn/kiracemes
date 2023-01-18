const model = require("../models");

exports.create = async (body) => {
  try {
    await model.postsTags.create({
      post_id: body.post_id,
      tag_id: body.tag_id,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.destroy = async (post_id) => {
  try {
    await model.postsTags.destroy({
      where: {
        post_id: post_id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
