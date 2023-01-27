const moment = require("moment");
const service = require("../../services");
const util = require("../../utils");

exports.main = async (req, res) => {
  try {
    const { params } = req;

    const setting = await util.getSetting();
    const findBy = {
      limit: setting.posts_per_page,
      slug: params.slug,
    };
    const posts = await service.posts.findAllByTag({ order: "published_at", query: findBy });

    res.render("blog/multiple", {
      blog: {
        title: setting.title,
        description: setting.description,
        homepageUrl: setting.homeurl,
        pageTitle: setting.title,
        meta_title: setting.meta_title,
        meta_description: setting.meta_description,
      },
      view: {
        isHomepage: false,
        isMultipleItems: true,
        isSingleItem: false,
        isPost: false,
        isPage: false,
        isSearch: false,
        isCategory: true,
      },
      posts: posts.data.map((post) => {
        return {
          id: post.id,
          title: post.title,
          content: post.content ? post.content.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, "") : "",
          author: {
            name: post.author.name,
            url: `${setting.homeurl}/author/${post.author.slug}`,
            image: post.author.image,
            bio: post.author.bio,
          },
          url: `${setting.homeurl}/blog/${post.slug}`,
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
            publishedISO: new Date(post.published_at).toISOString().substring(0, 19) + setting.timezone,
            updatedISO: new Date(post.updated_at).toISOString().substring(0, 19) + setting.timezone,
            published: (format) => {
              return moment(post.published_at).format(format);
            },
            updated: (format) => {
              return moment(post.updated_at).format(format);
            },
          },
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          og_image: post.og_image,
          og_title: post.og_title,
          og_description: post.og_description,
          twitter_image: post.twitter_image,
          twitter_title: post.twitter_title,
          twitter_description: post.twitter_description,
          tags: post.tags.map((tag) => {
            return {
              name: tag.name,
              url: `${setting.homeurl}/category/${tag.slug}`,
            };
          }),
        };
      }),
      helpers: {
        shorten: (str, maxLength, separator = " ") => {
          if (str.length <= maxLength) return str;
          return str.substr(0, str.lastIndexOf(separator, maxLength));
        },
      },
      pagination: {
        page: 1,
        limit: setting.posts_per_page,
        pages: Math.ceil(posts.count / setting.posts_per_page),
        total: posts.count,
        next: null,
        prev: posts.count > setting.posts_per_page ? `${setting.homeurl}/category/${params.slug}/page/2` : null,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.pagination = async (req, res) => {
  try {
    const { params, query } = req;

    if (parseInt(params.page) === 1) {
      res.redirect(`/category/${params.slug}`);
      return false;
    }

    const setting = await util.getSetting();
    const findBy = {
      limit: setting.posts_per_page,
      page: params.page,
      slug: params.slug,
    };
    const posts = await service.posts.findAllByTag({ order: "published_at", query: findBy });

    if (posts.data.length == 0) {
      res.redirect(`/category/${params.slug}`);
      return false;
    }

    res.render("blog/multiple", {
      blog: {
        title: setting.title,
        description: setting.description,
        homepageUrl: setting.homeurl,
        pageTitle: setting.title,
        meta_title: setting.meta_title,
        meta_description: setting.meta_description,
      },
      view: {
        isHomepage: false,
        isMultipleItems: true,
        isSingleItem: false,
        isPost: false,
        isPage: false,
        isSearch: false,
        isCategory: true,
      },
      posts: posts.data.map((post) => {
        return {
          id: post.id,
          title: post.title,
          content: post.content ? post.content.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, "") : "",
          author: {
            name: post.author.name,
            url: `${setting.homeurl}/author/${post.author.slug}`,
            image: post.author.image,
            bio: post.author.bio,
          },
          url: `${setting.homeurl}/blog/${post.slug}`,
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
            publishedISO: new Date(post.published_at).toISOString().substring(0, 19) + setting.timezone,
            updatedISO: new Date(post.updated_at).toISOString().substring(0, 19) + setting.timezone,
            published: (format) => {
              return moment(post.published_at).format(format);
            },
            updated: (format) => {
              return moment(post.updated_at).format(format);
            },
          },
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          og_image: post.og_image,
          og_title: post.og_title,
          og_description: post.og_description,
          twitter_image: post.twitter_image,
          twitter_title: post.twitter_title,
          twitter_description: post.twitter_description,
          tags: post.tags.map((tag) => {
            return {
              name: tag.name,
              url: `${setting.homeurl}/category/${tag.slug}`,
            };
          }),
        };
      }),
      helpers: {
        shorten: (str, maxLength, separator = " ") => {
          if (str.length <= maxLength) return str;
          return str.substr(0, str.lastIndexOf(separator, maxLength));
        },
      },
      pagination: {
        page: params.page > 0 ? parseInt(params.page) : 1,
        limit: parseInt(setting.posts_per_page),
        pages: Math.ceil(posts.count / parseInt(setting.posts_per_page)),
        total: posts.count,
        next:
          Math.ceil(posts.count / parseInt(setting.posts_per_page)) > 1
            ? params.page > 1
              ? parseInt(params.page - 1) === 1
                ? `${setting.homeurl}/category/${params.slug}`
                : `${setting.homeurl}/category/${params.slug}/page/${parseInt(params.page) - 1}`
              : null
            : null,
        prev:
          Math.ceil(posts.count / parseInt(setting.posts_per_page)) > 1 &&
          Math.ceil(posts.count / parseInt(setting.posts_per_page)) > parseInt(params.page || 1)
            ? params.page > 0
              ? `${setting.homeurl}/category/${params.slug}/page/${parseInt(params.page) + 1}`
              : `${setting.homeurl}/category/${params.slug}/page/2`
            : null,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
