const error404 = require("./error-404");
const moment = require("moment");
const service = require("../../services");
const util = require("../../utils");

module.exports = async (req, res) => {
  try {
    const { params } = req;
    const setting = await util.getSetting();
    const page = await service.pages.blog.findBySlug(params.slug);

    if (!page) {
      return error404(req, res);
    }

    res.render("blog/static-page", {
      blog: {
        title: setting.title,
        description: setting.description,
        homepageUrl: setting.homeurl,
        pageTitle: page.title,
        meta_title: setting.meta_title,
        meta_description: setting.meta_description,
      },
      view: {
        isHomepage: false,
        isMultipleItems: false,
        isSingleItem: true,
        isPost: false,
        isPage: true,
        isSearch: false,
        isCategory: false,
        isAuthor: false,
        isError: true,
      },
      page: {
        id: page.id,
        title: page.title,
        content: page.content,
        author: {
          name: page.author.name,
          url: `${setting.homeurl}/author/${page.author.slug}`,
          image: page.author.image,
          bio: page.author.bio,
        },
        url: `${setting.homeurl}/blog/${page.slug}`,
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
          publishedISO: new Date(page.published_at).toISOString().substring(0, 19) + setting.timezone,
          updatedISO: new Date(page.updated_at).toISOString().substring(0, 19) + setting.timezone,
          published: (format) => {
            return moment(page.published_at).format(format);
          },
          updated: (format) => {
            return moment(page.updated_at).format(format);
          },
        },
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        og_image: page.og_image,
        og_title: page.og_title,
        og_description: page.og_description,
        twitter_image: page.twitter_image,
        twitter_title: page.twitter_title,
        twitter_description: page.twitter_description,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
