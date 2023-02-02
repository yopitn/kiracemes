const logger = require("../../libs/logger");
const model = require("../../models");

exports.findBySlug = async (slug) => {
  try {
    const page = await model.posts.findOne({
      attributes: [
        "id",
        "uuid",
        "title",
        "slug",
        "content",
        "status",
        "meta_title",
        "meta_description",
        "og_image",
        "og_title",
        "og_description",
        "twitter_image",
        "twitter_title",
        "twitter_description",
        "created_at",
        "created_at",
        "updated_at",
        "published_at",
      ],
      where: {
        slug: slug,
        type: "page",
        status: "published",
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name", "slug", "image", "bio", "location", "role", "meta_title", "meta_description", "created_at", "updated_at"],
        },
      ],
    });

    return page;
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
