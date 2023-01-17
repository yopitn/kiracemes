exports.index = (req, res) => {
  try {
    res.render("admin/posts");
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = (req, res) => {
  try {
    res.render("admin/editor");
  } catch (error) {
    throw new Error(error);
  }
};
