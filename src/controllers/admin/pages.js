const service = require("../../services");
const util = require("../../utils");

exports.index = async (req, res) => {
  try {
    const { query, user_id } = req;
    const setting = await util.getSetting();
    const user = await service.users.findById(user_id);
    const pages = await service.pages.findAllAdmin({ order: "created_at", query: query });

    let limit = parseInt(query.limit || 10);
    limit = limit < 0 ? 10 : limit;

    res.render("admin/pages", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: Pages`,
      },
      view: {
        isHomepage: true,
        isPosts: false,
        isPages: true,
        isSetting: false,
        isProfile: false,
        isSetting: false,
        isEditor: false,
        isPostCreate: false,
        isPostUpdate: false,
        isPageCreate: false,
        isPageUpdate: false,
        isError: false,
      },
      user: user,
      pages: pages.data.map((page) => {
        return {
          id: page.id,
          title: page.title,
          author: page.author.name,
          url: `${setting.homeurl}/${page.slug}`,
          status: page.status,
          featuredImage: () => {
            const content = page.content;

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
            iso: page.published_at,
            published: page.published_at,
            created: page.created_at,
          },
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
        pages: Math.ceil(pages.count / limit),
        total: pages.count,
        next:
          Math.ceil(pages.count / limit) > 1 && Math.ceil(pages.count / limit) > parseInt(query.page || 1)
            ? query.page > 0
              ? parseInt(query.page) + 1
              : 2
            : null,
        prev: Math.ceil(pages.count / limit) > 1 ? (query.page > 1 ? parseInt(query.page) - 1 : null) : null,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { user_id } = req;
    const setting = await util.getSetting();
    const user = await service.users.findById(user_id);

    res.render("admin/editor", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: New Page`,
      },
      view: {
        isHomepage: false,
        isPosts: false,
        isPages: false,
        isSetting: false,
        isProfile: false,
        isSetting: false,
        isEditor: true,
        isPostCreate: false,
        isPostUpdate: false,
        isPageCreate: true,
        isPageUpdate: false,
        isError: false,
      },
      user: user,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { params, user_id } = req;
    const setting = await util.getSetting();
    const user = await service.users.findById(user_id);
    const page = await service.pages.findById(params.id);

    res.render("admin/editor", {
      blog: {
        title: setting.title,
        homepageUrl: setting.homeurl,
        pageTitle: `${setting.title}: Update Page`,
      },
      view: {
        isHomepage: false,
        isPosts: false,
        isPages: false,
        isProfile: false,
        isSetting: false,
        isEditor: true,
        isPostCreate: false,
        isPostUpdate: false,
        isPageCreate: false,
        isPageUpdate: true,
        isError: false,
      },
      user: user,
      page: {
        title: page.title,
        slug: page.slug,
        content: page.content,
        featured: page.featured,
        status: page.status,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        og_image: page.og_image,
        og_title: page.og_title,
        og_description: page.og_description,
        twitter_image: page.twitter_image,
        twitter_title: page.twitter_title,
        twitter_description: page.twitter_description,
        published_at: page.published_at,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
