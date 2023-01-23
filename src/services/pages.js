const { Op } = require("sequelize");
const model = require("../models");

exports.create = async (body) => {
  try {
    await model.posts.create({
      id: body.id,
      author_id: body.author_id,
      title: body.title,
      slug: body.slug,
      content: body.content,
      type: "page",
      status: body.status,
      meta_title: body.meta_title,
      meta_description: body.meta_description,
      og_image: body.og_image,
      og_title: body.og_title,
      og_description: body.og_description,
      twitter_image: body.twitter_image,
      twitter_title: body.twitter_title,
      twitter_description: body.twitter_description,
      created_at: new Date(),
      published_at: body.published_at,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.findAll = async ({ order, query }) => {
  try {
    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;

    const offset = page * limit;

    const pages = await model.posts.findAll({
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
        type: "page",
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name", "slug", "image", "bio", "location", "role", "meta_title", "meta_description", "created_at", "updated_at"],
        },
      ],
      order: [[order, "DESC"]],
      limit: limit,
      offset: offset,
    });

    const count = await model.posts.findAll({
      where: {
        type: "page",
      },
    });

    return {
      data: pages,
      count: count.length,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.findAllAdmin = async ({ order, query }) => {
  try {
    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;

    const offset = page * limit;

    let search = query.q ? { [Op.or]: [{ title: { [Op.like]: `%${query.q}%` } }] } : undefined;
    let status = query.status ? { [Op.and]: [{ status: { [Op.like]: `%${query.status}%` } }] } : undefined;

    const pages = await model.posts.findAll({
      attributes: ["id", "title", "slug", "content", "status", "created_at", "updated_at", "published_at"],
      where: {
        type: "page",
        ...search,
        ...status,
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name"],
        },
      ],
      order: [[order, "DESC"]],
      limit: limit,
      offset: offset,
    });

    const count = await model.posts.findAll({
      where: {
        type: "page",
        ...search,
        ...status,
      },
    });

    return {
      data: pages,
      count: count.length,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.findById = async (id) => {
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
        id: id,
        type: "page",
      },
    });

    return page;
  } catch (error) {
    throw new Error(error);
  }
};

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
      },
    });

    return page;
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async ({ body, id }) => {
  try {
    await model.posts.update(
      {
        title: body.title,
        slug: body.slug,
        content: body.content,
        status: body.status,
        meta_title: body.meta_title,
        meta_description: body.meta_description,
        og_image: body.og_image,
        og_title: body.og_title,
        og_description: body.og_description,
        twitter_image: body.twitter_image,
        twitter_title: body.twitter_title,
        twitter_description: body.twitter_description,
        updated_at: new Date(),
      },
      {
        where: {
          id: id,
          type: "page",
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.destroy = async (id) => {
  try {
    await model.posts.destroy({
      where: {
        id: id,
        type: "page",
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
