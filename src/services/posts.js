
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

exports.findAll = async ({order_by, limit, offset, search = null}) => {
  try {
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
        ...search
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
      order: [[order_by, "DESC"]],
      limit: limit,
      offset: offset,
    });

    return posts;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findAllCount = async (search = null) => {
  try {
    const posts = await model.posts.findAll({
      where: {
        type: "post",
        ...search
      },
    });

    return posts.length;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findById = async (post_id) => {
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
        id: post_id,
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

exports.findBySlug = async (post_slug) => {
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
        slug: post_slug,
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

exports.search = async (query) => {
  try {
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
          attributes: [
            "id", 
            "name", 
            "slug", 
            "image", 
            "bio", 
            "location", 
            "role", 
            "meta_title", 
            "meta_description", 
            "created_at", 
            "updated_at"
          ],
        },
        {
          model: model.tags,
          through: {
            attributes: [],
          },
        },
      ],
      order: [[order_by, "DESC"]],
      limit: limit,
      offset: offset,
    });
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
