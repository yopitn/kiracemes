const { Op } = require("sequelize");
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

    const pages = await model.posts.findAll({
      attributes: ["id", "title", "slug", "content", "status", "created_at", "updated_at", "published_at"],
      where: {
        type: "page",
        ...search,
        ...status,
      },
      include: [
        {
          model: model.users,
          as: "author",
          attributes: ["id", "name"],
        },
      ],
      order: [[order, "DESC"]],
      limit: limit,
      offset: offset,
    });

    const count = await model.posts.findAll({
      where: {
        type: "page",
        ...search,
        ...status,
      },
    });

    return {
      data: pages,
      count: count.length,
    };
  } catch (error) {
    throw new Error(error);
  }
};
