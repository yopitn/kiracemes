const { Op } = require("sequelize");
const model = require("../models");

exports.create = async (body) => {
  try {
    await model.tags.create({
      id: body.id,
      name: body.name,
      slug: body.slug,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.findAll = async () => {
  try {
    const tags = await model.tags.findAll({
      attributes: [
        "id",
        "name",
        "slug",
        "meta_title",
        "meta_description",
        "og_image",
        "og_title",
        "og_description",
        "twitter_image",
        "twitter_title",
        "twitter_description",
        "created_at",
        "updated_at",
      ],
    });

    return tags;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findByName = async (tag_name) => {
  try {
    const tag = await model.tags.findOne({
      attributes: [
        "id",
        "name",
        "slug",
        "meta_title",
        "meta_description",
        "og_image",
        "og_title",
        "og_description",
        "twitter_image",
        "twitter_title",
        "twitter_description",
        "created_at",
        "updated_at",
      ],
      where: {
        name: tag_name,
      },
    });

    return tag;
  } catch (error) {
    throw new Error(error);
  }
};

exports.search = async (query) => {
  try {
    const tags = await model.tags.findAll({
      attributes: ["id", "name", "slug"],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });

    console.log(tags)

    return tags;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findBySlug = async (tag_slug) => {
  try {
    const tag = await model.tags.findOne({
      attributes: [
        "id",
        "name",
        "slug",
        "meta_title",
        "meta_description",
        "og_image",
        "og_title",
        "og_description",
        "twitter_image",
        "twitter_title",
        "twitter_description",
        "created_at",
        "updated_at",
      ],
      where: {
        slug: tag_slug,
      },
    });

    return tag;
  } catch (error) {
    throw new Error(error);
  }
};
