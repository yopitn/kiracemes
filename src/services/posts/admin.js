const { Op } = require("sequelize");
const logger = require("../../libs/logger");
const model = require("../../models");

module.exports = async ({ order, query }) => {
  try {
    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;

    const offset = page * limit;

    let search = query.q ? { [Op.or]: [{ title: { [Op.like]: `%${query.q}%` } }] } : undefined;
    let status = query.status ? { [Op.and]: [{ status: { [Op.like]: `%${query.status}%` } }] } : undefined;
    let tag = query.tag ? { where: { [Op.and]: [{ name: { [Op.like]: `%${query.tag}%` } }] } } : undefined;

    const posts = await model.posts.findAll({
      attributes: ["id", "title", "slug", "content", "status", "created_at", "updated_at", "published_at"],
      where: {
        type: "post",
        ...search,
        ...status,
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name"],
        },
        {
          model: model.tags,
          ...tag,
          through: {
            attributes: [],
          },
        },
      ],
      order: [[order, "DESC"]],
      limit: limit,
      offset: offset,
    });

    const count = await model.posts.findAll({
      where: {
        type: "post",
        ...search,
        ...status,
      },
      include: [
        {
          model: model.tags,
          ...tag,
          through: {
            attributes: [],
          },
        },
      ],
    });

    return {
      data: posts,
      count: count.length,
    };
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
