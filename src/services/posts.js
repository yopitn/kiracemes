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
      featured: body.featured,
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
      },
    });

    return {
      data: posts,
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
    let tag = query.tag ? { where: { [Op.and]: [{ name: { [Op.like]: `%${query.tag}%` } }] } } : undefined;

    const posts = await model.posts.findAll({
      attributes: ["id", "title", "slug", "content", "status", "created_at", "updated_at", "published_at"],
      where: {
        type: "post",
        ...search,
        ...status,
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name"],
        },
        {
          model: model.tags,
          ...tag,
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
        ...status,
      },
      include: [
        {
          model: model.tags,
          ...tag,
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

exports.findById = async (id) => {
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
        "updated_at",
        "published_at",
      ],
      where: {
        id: id,
        type: "post",
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
            name: query.tag,
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
      },
      include: [
        {
          model: model.tags,
          where: {
            name: query.tag,
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

exports.search = async ({ order, query }) => {
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
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
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
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });

    return {
      data: posts,
      count: count.length,
    };
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
        featured: body.featured,
        status: body.status,
        meta_title: body.meta_title,
        meta_description: body.meta_description,
        og_image: body.og_image,
        og_title: body.og_title,
        og_description: body.og_description,
        twitter_image: body.twitter_image,
        twitter_title: body.twitter_title,
        twitter_description: body.twitter_description,
        published_at: body.published_at,
        updated_at: new Date(),
      },
      {
        where: {
          id: id,
          type: "post",
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
        type: "post",
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
