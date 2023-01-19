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

    const setting = await settings();
    const posts = await service.posts.findAll("created_at", limit, offset);

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
              const regex1 =
                /<\s*?img\s+[^>]*?\s*src\s*=\s*(["'])((\\?.)*?)\1[^>]*?>/gm;
              const regex2 = /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/;

              const imgArr = content.match(regex1);
              const imgElem = imgArr[0];

              if (imgArr.length != 0) {
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
      helpers: {
        parseDate: (datetime) => {
          const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          const date = new Date(datetime).toLocaleDateString();
          const arr = date.split("/");

          return `${month[arr[0] - 1]} ${arr[1]}, ${arr[2]}`;
        },
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
        isError: false,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
