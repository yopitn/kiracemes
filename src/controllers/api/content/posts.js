const service = require("../../../services");

exports.findAll = async (req, res) => {
  try {
    const { query } = req;

    let limit = parseInt(query.limit || 10);
    limit = limit < 0 ? 10 : limit;

    const posts = await service.posts.api.findAll({
      order: "created_at",
      query: query,
    });

    if (posts.data.length > 0) {
      res.status(200).json({
        posts: posts.data.map((post) => {
          return {
            id: post.id,
            uuid: post.uuid,
            title: post.title,
            slug: post.slug,
            content: post.content,
            featured: post.featured,
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
          pages: Math.ceil(posts.count / limit),
          total: posts.count,
          next:
            Math.ceil(posts.count / limit) > 1 && Math.ceil(posts.count / limit) > parseInt(query.page || 1)
              ? query.page > 0
                ? parseInt(query.page) + 1
                : 2
              : null,
          prev: Math.ceil(posts.count / limit) > 1 ? (query.page > 1 ? parseInt(query.page) - 1 : null) : null,
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

    const post = await service.posts.api.findById(params.id);

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

    const post = await service.posts.api.findBySlug(params.slug);

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
