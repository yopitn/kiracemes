const model = require("../models");

exports.create = async (post) => {
  try {
    await model.posts.create({
      id: post.id,
      author_id: post.author_id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      featured: post.featured,
      status: post.status,
      created_at: new Date(),
      published_at: post.published_at,
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

exports.findById = async (id) => {
  try {
    const post = await model.posts.findOne({
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
        id: id,
        type: "post",
      },
    });

    return post;
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (post, id) => {
  try {
    await model.posts.update(
      {
        title: post.title,
        slug: post.slug,
        content: post.content,
        featured: post.featured,
        status: post.status,
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