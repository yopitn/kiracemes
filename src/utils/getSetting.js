const { settings } = require("../services");

const getSetting = async () => {
  try {
    const setting = {
      url: await settings.findByName("url"),
      homeurl: await settings.findByName("homeurl"),
      title: await settings.findByName("title"),
      description: await settings.findByName("description"),
      language: await settings.findByName("language"),
      posts_per_page: await settings.findByName("posts_per_page"),
      timezone: await settings.findByName("timezone"),
    };

    return setting;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getSetting;
