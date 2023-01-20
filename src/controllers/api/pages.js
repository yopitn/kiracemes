const { customAlphabet } = require("nanoid");
const service = require("../../services");

const nanoid = customAlphabet("1234567890", 24);

exports.create = async (req, res) => {
  try {
    const { body, user_id } = req;

    if (!body.slug) body.slug = body.title;
    if (!body.published_at && body.status === "published")
      body.published_at = new Date();

    const page = {
      id: nanoid(),
      author_id: user_id,
      title: body.title,
      slug: body.slug,
      content: body.content,
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
    const { query } = req;

    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;
    const offset = page * limit;

    const pages = await service.pages.findAll("created_at", limit, offset);
    const pagesCount = await service.pages.findAllCount();

    if (pages.length > 0) {
      res.status(200).json({
        pages: pages.map((page) => {
          return {
            id: page.id,
            uuid: page.uuid,
            title: page.title,
            slug: page.slug,
            content: page.content,
            status: page.status,
            meta_title: page.meta_title,
            meta_description: page.meta_description,
            og_image: page.og_image,
            og_title: page.og_title,
            og_description: page.og_description,
            twitter_image: page.twitter_image,
            twitter_title: page.twitter_title,
            twitter_description: page.twitter_description,
            created_at: page.created_at,
            updated_at: page.updated_at,
            published_at: page.published_at,
            author: page.author,
          };
        }),
        pagination: {
          page: query.page > 0 ? parseInt(query.page) : 1,
          limit: limit,
          pages: Math.ceil(pagesCount / limit),
          total: pagesCount,
          next:
            Math.ceil(pagesCount / limit) > 1 &&
            Math.ceil(pagesCount / limit) > parseInt(query.page || 1)
              ? query.page > 0
                ? parseInt(query.page) + 1
                : 2
              : null,
          prev:
            Math.ceil(pagesCount / limit) > 1
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

    if (page) {
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

    if (page) {
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
