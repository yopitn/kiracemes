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
      created_at: new Date(),
      published_at: body.published_at,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.findAll = async () => {
  try {
    const posts = await model.posts.findAll({
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
        type: "post",
      },
      order: [["published_at", "DESC"]],
    });

    return posts;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findById = async (post_id) => {
  try {
    const post = await model.posts.findAll({
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
        id: post_id,
        type: "post",
      },
    });

    return post;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findBySlug = async (post_slug) => {
  try {
    const post = await model.posts.findAll({
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
        slug: post_slug,
        type: "post",
      },
    });

    return post;
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (body, post_id) => {
  try {
    await model.posts.update(
      {
        title: body.title,
        slug: body.slug,
        content: body.content,
        featured: body.featured,
        status: body.status,
        updated_at: new Date(),
      },
      {
        where: {
          id: post_id,
          type: "post",
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.destroy = async (post_id) => {
  try {
    await model.posts.destroy({
      where: {
        id: post_id,
        type: "post",
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
