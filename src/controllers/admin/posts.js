const { Op } = require("sequelize");
const service = require("../../services");
const settings = require("../../utils/settings");

exports.index = async (req, res) => {
  try {
    const { query } = req;

    let page = query.page ? query.page - 1 : 0;
    let limit = parseInt(query.limit || 10);
    page = page < 0 ? 0 : page;
    limit = limit < 0 ? 10 : limit;
    const offset = page * limit;

    const getSearch = () => {
      let condition;

      if (query.q) {
        condition = {
          [Op.or]: [{ title: { [Op.like]: `%${query.q}%` } }],
        };
      }

      return condition;
    };

    const getStatus = () => {
      let condition;

      if (query.status) {
        condition = {
          [Op.and]: [{ status: { [Op.like]: `%${query.status}%` } }],
        };
      }

      return condition;
    };

    const getTag = () => {
      let condition;

      if (query.tag) {
        condition = {
          where: {
            [Op.and]: [{ name: { [Op.like]: `%${query.tag}%` } }],
          },
        };
      }

      return condition;
    };

    const setting = await settings();

    const posts = await service.posts.findAll({
      order_by: "created_at",
      limit: limit,
      offset: offset,
      search_query: getSearch(),
      status_query: getStatus(),
      tag_query: getTag(),
    });

    const postsCount = await service.posts.findAllCount({
      search_query: getSearch(),
      status_query: getStatus(),
      tag_query: getTag(),
    });

    const tags = await service.tags.findAll();

    res.render("admin/posts", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: Posts`,
      },
      view: {
        isHomepage: true,
        isPosts: true,
        isPages: false,
        isSetting: false,
        isEditor: false,
        isPostCreate: false,
        isPostUpdate: false,
        isPageUpdate: false,
        isPageCreate: false,
        isError: false,
      },
      posts: posts.map((post) => {
        return {
          id: post.id,
          title: post.title,
          author: post.author.name,
          url: `${setting.homeurl}/blog/${post.slug}`,
          status: post.status,
          featuredImage: () => {
            const content = post.content;

            if (content) {
              const regex1 = /<\s*?img\s+[^>]*?\s*src\s*=\s*(["'])((\\?.)*?)\1[^>]*?>/gm;
              const regex2 = /src\=(?:\"|\')(.+?)(?:\"|\')/;

              const imgArr = content.match(regex1);

              if (imgArr) {
                const imgElem = imgArr[0];

                const img = imgElem.match(regex2);

                return img[1];
              }

              return null;
            }

            return null;
          },
          date: {
            iso: post.published_at,
            published: post.published_at,
            created: post.created_at,
          },
          tags: post.tags.map((tag) => {
            return {
              name: tag.name,
            };
          }),
        };
      }),
      tags: tags.map((tag) => {
        return {
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
        };
      }),
      helpers: {
        parseDate: (datetime) => {
          const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

          const date = new Date(datetime).toLocaleDateString();
          const arr = date.split("/");

          return `${month[arr[0] - 1]} ${arr[1]}, ${arr[2]}`;
        },
      },
      pagination: {
        page: query.page > 0 ? parseInt(query.page) : 1,
        limit: limit,
        pages: Math.ceil(postsCount / limit),
        total: postsCount,
        next:
          Math.ceil(postsCount / limit) > 1 && Math.ceil(postsCount / limit) > parseInt(query.page || 1)
            ? query.page > 0
              ? parseInt(query.page) + 1
              : 2
            : null,
        prev: Math.ceil(postsCount / limit) > 1 ? (query.page > 1 ? parseInt(query.page) - 1 : null) : null,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = async (req, res) => {
  try {
    const setting = await settings();

    res.render("admin/editor", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: New Post`,
      },
      view: {
        isHomepage: false,
        isPosts: false,
        isPages: false,
        isSetting: false,
        isEditor: true,
        isPostCreate: true,
        isPostUpdate: false,
        isPageUpdate: false,
        isPageCreate: false,
        isError: false,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { params } = req;

    const setting = await settings();

    const post = await service.posts.findById(params.id);

    res.render("admin/editor", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: Update Post`,
      },
      view: {
        isHomepage: false,
        isPosts: false,
        isPages: false,
        isSetting: false,
        isEditor: true,
        isPostCreate: false,
        isPostUpdate: true,
        isPageUpdate: false,
        isPageCreate: false,
        isError: false,
      },
      post: {
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
        published_at: post.published_at,
        tags: post.tags.map((tag) => {
          return {
            name: tag.name,
          };
        }),
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
