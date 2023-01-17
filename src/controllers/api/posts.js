const { customAlphabet } = require("nanoid");
const service = require("../../services");

const nanoid = customAlphabet("1234567890", 24);

exports.create = async (req, res) => {
  try {
    const { body } = req;

    if (!body.slug) body.slug = body.title;
    if (!body.published_at && body.status === "published")
      body.published_at = new Date();

    const post = {
      id: nanoid(),
      author_id: body.user_id,
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
        post,
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "No post found",
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
