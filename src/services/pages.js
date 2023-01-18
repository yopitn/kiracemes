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
      created_at: new Date(),
      published_at: body.published_at,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.findAll = async () => {
  try {
    const pages = await model.posts.findAll({
      attributes: [
        "id",
        "uuid",
        "title",
        "slug",
        "content",
        "status",
        "created_at",
        "updated_at",
        "published_at",
      ],
      where: {
        type: "page",
      },
      order: [["published_at", "DESC"]],
    });

    return pages;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findById = async (page_id) => {
  try {
    const page = await model.posts.findAll({
      attributes: [
        "id",
        "uuid",
        "title",
        "slug",
        "content",
        "status",
        "created_at",
        "updated_at",
        "published_at",
      ],
      where: {
        id: page_id,
        type: "page",
      },
    });

    return page;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findBySlug = async (page_slug) => {
  try {
    const page = await model.posts.findAll({
      attributes: [
        "id",
        "uuid",
        "title",
        "slug",
        "content",
        "status",
        "created_at",
        "updated_at",
        "published_at",
      ],
      where: {
        slug: page_slug,
        type: "page",
      },
    });

    return page;
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (body, page_id) => {
  try {
    await model.posts.update(
      {
        title: body.title,
        slug: body.slug,
        content: body.content,
        status: body.status,
        updated_at: new Date(),
      },
      {
        where: {
          id: page_id,
          type: "page",
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.destroy = async (page_id) => {
  try {
    await model.posts.destroy({
      where: {
        id: page_id,
        type: "page",
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
