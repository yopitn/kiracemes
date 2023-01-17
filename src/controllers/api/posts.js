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
      published_at: body.published_at,
    };

    await service.posts.create(post);

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
    const posts = await service.posts.findAll();

    if (posts.length > 0) {
      res.status(200).json({
        posts,
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

    await service.posts.update(body, params.id);

    res.status(200).json({
      body,
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

exports.destroy = async (req, res) => {
  try {
    const { params } = req;

    const post = await service.posts.findById(params.id);

    console.log(post)

    if (post) {
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
            message: "Post Not Found",
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
