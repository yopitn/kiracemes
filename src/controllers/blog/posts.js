const error404 = require("./error-404");
const logger = require("../../libs/logger");
const moment = require("moment");
const service = require("../../services");
const util = require("../../utils");

module.exports = async (req, res) => {
  try {
    const { params } = req;
    const setting = await util.getSetting();
    const post = await service.posts.blog.findBySlug(params.slug);

    if (!post) {
      return error404(req, res);
    }

    res.render("blog/posts", {
      blog: {
        title: setting.title,
        description: setting.description,
        homepageUrl: setting.homeurl,
        pageTitle: post.title,
        meta_title: setting.meta_title,
        meta_description: setting.meta_description,
      },
      view: {
        isHomepage: false,
        isMultipleItems: false,
        isSingleItem: true,
        isPost: true,
        isPage: false,
        isSearch: false,
        isCategory: false,
        isAuthor: false,
        isError: true,
      },
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
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
      },
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
