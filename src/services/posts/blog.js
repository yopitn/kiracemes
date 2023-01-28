const { Op } = require("sequelize");
const model = require("../../models");

exports.findAll = async ({ order, query }) => {
  try {
    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;

    const offset = page * limit;

    let search = query.search ? { [Op.or]: [{ title: { [Op.like]: `%${query.search}%` } }] } : undefined;

    const posts = await model.posts.findAll({
      attributes: [
        "id",
        "uuid",
        "title",
        "slug",
        "content",
        "featured",
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
        "updated_at",
        "published_at",
      ],
      where: {
        type: "post",
        status: "published",
        ...search,
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name", "slug", "image", "bio", "location", "role", "meta_title", "meta_description", "created_at", "updated_at"],
        },
        {
          model: model.tags,
          through: {
            attributes: [],
          },
        },
      ],
      order: [[order, "DESC"]],
      limit: limit,
      offset: offset,
    });

    const count = await model.posts.findAll({
      where: {
        type: "post",
        ...search,
      },
      include: [
        {
          model: model.tags,
          through: {
            attributes: [],
          },
        },
      ],
    });

    return {
      data: posts,
      count: count.length,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.findAllByTag = async ({ order, query }) => {
  try {
    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;

    const offset = page * limit;

    const posts = await model.posts.findAll({
      attributes: [
        "id",
        "uuid",
        "title",
        "slug",
        "content",
        "featured",
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
        "updated_at",
        "published_at",
      ],
      where: {
        type: "post",
        status: "published",
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name", "slug", "image", "bio", "location", "role", "meta_title", "meta_description", "created_at", "updated_at"],
        },
        {
          model: model.tags,
          where: {
            slug: query.slug,
          },
          through: {
            attributes: [],
          },
        },
      ],
      order: [[order, "DESC"]],
      limit: limit,
      offset: offset,
    });

    const count = await model.posts.findAll({
      where: {
        type: "post",
        status: "published",
      },
      include: [
        {
          model: model.tags,
          where: {
            slug: query.slug,
          },
          through: {
            attributes: [],
          },
        },
      ],
    });

    return {
      data: posts,
      count: count.length,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.findAllByAuthor = async ({ order, query }) => {
  try {
    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;

    const offset = page * limit;

    const posts = await model.posts.findAll({
      attributes: [
        "id",
        "uuid",
        "title",
        "slug",
        "content",
        "featured",
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
        "updated_at",
        "published_at",
      ],
      where: {
        type: "post",
        status: "published",
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name", "slug", "image", "bio", "location", "role", "meta_title", "meta_description", "created_at", "updated_at"],
          where: {
            slug: query.slug,
          },
        },
        {
          model: model.tags,
          through: {
            attributes: [],
          },
        },
      ],
      order: [[order, "DESC"]],
      limit: limit,
      offset: offset,
    });

    const count = await model.posts.findAll({
      where: {
        type: "post",
        status: "published",
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: [],
          where: {
            slug: query.slug,
          },
        },
      ],
    });

    return {
      data: posts,
      count: count.length,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.findBySlug = async (slug) => {
  try {
    const post = await model.posts.findOne({
      attributes: [
        "id",
        "uuid",
        "title",
        "slug",
        "content",
        "featured",
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
        type: "post",
        status: "published",
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name", "slug", "image", "bio", "location", "role", "meta_title", "meta_description", "created_at", "updated_at"],
        },
        {
          model: model.tags,
          through: {
            attributes: [],
          },
        },
      ],
    });

    return post;
  } catch (error) {
    throw new Error(error);
  }
};
