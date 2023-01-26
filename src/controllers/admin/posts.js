const service = require("../../services");
const util = require("../../utils");

exports.index = async (req, res) => {
  try {
    const { query, user_id } = req;
    const setting = await util.getSetting();
    const user = await service.users.findById(user_id);
    const posts = await service.posts.findAllAdmin({ order: "created_at", query: query });
    const tags = await service.tags.findAll();

    let limit = parseInt(query.limit || 10);
    limit = limit < 0 ? 10 : limit;

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
      posts: posts.data.map((post) => {
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
        pages: Math.ceil(posts.count / limit),
        total: posts.data,
        next:
          Math.ceil(posts.data / limit) > 1 && Math.ceil(posts.data / limit) > parseInt(query.page || 1)
            ? query.page > 0
              ? parseInt(query.page) + 1
              : 2
            : null,
        prev: Math.ceil(posts.data / limit) > 1 ? (query.page > 1 ? parseInt(query.page) - 1 : null) : null,
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
        pageTitle: `${setting.title}: New Post`,
      },
      view: {
        isHomepage: false,
        isPosts: false,
        isPages: false,
        isProfile: false,
        isSetting: false,
        isEditor: true,
        isPostCreate: true,
        isPostUpdate: false,
        isPageCreate: false,
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
        isProfile: false,
        isSetting: false,
        isEditor: true,
        isPostCreate: false,
        isPostUpdate: true,
        isPageCreate: false,
        isPageUpdate: false,
        isError: false,
      },
      user: user,
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
