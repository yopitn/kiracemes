exports.index = (req, res) => {
  try {
    res.redirect("/admin/posts");
  } catch (error) {
    throw new Error(error);
  }
};
