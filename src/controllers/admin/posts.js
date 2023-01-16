exports.index = (req, res) => {
  try {
    res.render("admin/posts");
  } catch (error) {
    throw new Error(error);
  }
};
