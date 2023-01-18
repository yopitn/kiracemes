const { customAlphabet } = require("nanoid");
const service = require("../../services");

const nanoid = customAlphabet("1234567890", 24);

exports.create = async (req, res) => {
  try {
    const { body, user_id } = req;
    const page_id = nanoid();

    if (!body.slug) body.slug = body.title;
    if (!body.published_at && body.status === "published")
      body.published_at = new Date();

    const page = {
      id: page_id,
      author_id: user_id,
      title: body.title,
      slug: body.slug,
      content: body.content,
      status: body.status,
      published_at: body.published_at,
    };

    await service.pages.create(page);

    res.status(200).json({
      page: body,
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
    const pages = await service.pages.findAll();

    if (pages.length > 0) {
      res.status(200).json({
        pages,
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "No pages found",
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

    const page = await service.pages.findById(params.id);

    if (page.length > 0) {
      res.status(200).json({
        page: page,
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "Page not found",
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

    const page = await service.pages.findBySlug(params.slug);

    if (page.length > 0) {
      res.status(200).json({
        page: page,
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "Page not found",
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

    const page = await service.pages.findById(params.id);

    if (page.length > 0) {
      await service.pages.update(body, params.id);

      res.status(200).json({
        page: [
          {
            message: "Page updated succesful",
          },
        ],
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "Failed to update page, because page not found",
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

    const page = await service.pages.findById(params.id);

    if (page.length > 0) {
      await service.pages.destroy(params.id);

      res.status(204).json({
        page: [
          {
            message: "Page deleted succesful",
          },
        ],
      });
    } else {
      res.status(422).json({
        errors: [
          {
            message: "Failed to delete page, because page not found",
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
