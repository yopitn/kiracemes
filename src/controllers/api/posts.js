const { customAlphabet } = require("nanoid");
const service = require("../../services");

const nanoid = customAlphabet("1234567890", 24);

exports.create = async (req, res) => {
  try {
    const { body, user_id } = req;
    const post_id = nanoid();

    if (!body.slug) body.slug = body.title;
    if (!body.published_at && body.status === "published")
      body.published_at = new Date();

    const post = {
      id: post_id,
      author_id: user_id,
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
    };

    await service.posts.create(post);

    if (body.tags.length > 0) {
      body.tags.forEach(async (name) => {
        const tag = await service.tags.findByName(name);

        if (!tag) {
          const tag_id = nanoid();

          const body = {
            id: tag_id,
            tag_id: tag_id,
            post_id: post_id,
            name: name,
            slug: name,
          };

          await service.tags.create(body);
          await service.postsTags.create(body);
        } else {
          const body = {
            tag_id: tag.id,
            post_id: post_id,
          };

          await service.postsTags.create(body);
        }
      });
    }

    res.status(200).json({
      post: body,
    });
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { query } = req;

    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;
    const offset = page * limit;

    const posts = await service.posts.findAll("created_at", limit, offset);
    const postsCount = await service.posts.findAllCount();

    if (posts.length > 0) {
      res.status(200).json({
        posts: posts.map((post) => {
          return {
            id: post.id,
            uuid: post.uuid,
            title: post.title,
            slug: post.slug,
            content: post.content,
            status: post.status,
            meta_title: post.meta_title,
            meta_description: post.meta_description,
            og_image: post.og_image,
            og_title: post.og_title,
            og_description: post.og_description,
            twitter_image: post.twitter_image,
            twitter_title: post.twitter_title,
            twitter_description: post.twitter_description,
            created_at: post.created_at,
            updated_at: post.updated_at,
            published_at: post.published_at,
            author: post.author,
            tags: post.tags.map((tag) => {
              return {
                id: tag.id,
                name: tag.name,
                slug: tag.slug,
                meta_title: tag.meta_title,
                meta_description: tag.meta_description,
                og_image: tag.og_image,
                og_title: tag.og_title,
                og_description: tag.og_description,
                twitter_image: tag.twitter_image,
                twitter_title: tag.twitter_title,
                twitter_description: tag.twitter_description,
                created_at: tag.created_at,
                updated_at: tag.updated_at,
              };
            }),
          };
        }),
        pagination: {
          page: query.page > 0 ? parseInt(query.page) : 1,
          limit: limit,
          pages: Math.ceil(postsCount / limit),
          total: postsCount,
          next:
            Math.ceil(postsCount / limit) > 1 &&
            Math.ceil(postsCount / limit) > parseInt(query.page || 1)
              ? query.page > 0
                ? parseInt(query.page) + 1
                : 2
              : null,
          prev:
            Math.ceil(postsCount / limit) > 1
              ? query.page > 1
                ? parseInt(query.page) - 1
                : null
              : null,
        },
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "No posts found",
          },
        ],
      });
    }
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const { params } = req;

    const post = await service.posts.findById(params.id);

    if (post) {
      res.status(200).json({
        post: post,
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "Post not found",
          },
        ],
      });
    }
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};

exports.findBySlug = async (req, res) => {
  try {
    const { params } = req;

    const post = await service.posts.findBySlug(params.slug);

    if (post) {
      res.status(200).json({
        post: post,
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "Post not found",
          },
        ],
      });
    }
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { body, params } = req;

    const post = await service.posts.findById(params.id);

    if (post.length > 0) {
      await service.posts.update(body, params.id);

      await service.postsTags.destroy(params.id);

      if (body.tags.length > 0) {
        body.tags.forEach(async (name) => {
          const tag = await service.tags.findByName(name);

          if (!tag) {
            const tag_id = nanoid();

            const body = {
              id: tag_id,
              tag_id: tag_id,
              post_id: params.id,
              name: name,
              slug: name,
            };

            await service.tags.create(body);
            await service.postsTags.create(body);
          } else {
            const body = {
              tag_id: tag.id,
              post_id: params.id,
            };

            await service.postsTags.create(body);
          }
        });
      }

      res.status(200).json({
        post: [
          {
            message: "Post updated succesful",
          },
        ],
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "Failed to update post, because post not found",
          },
        ],
      });
    }
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { params } = req;

    const post = await service.posts.findById(params.id);

    if (post.length > 0) {
      await service.posts.destroy(params.id);

      res.status(204).json({
        post: [
          {
            message: "Post deleted succesful",
          },
        ],
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "Failed to delete post, because post not found",
          },
        ],
      });
    }
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};
