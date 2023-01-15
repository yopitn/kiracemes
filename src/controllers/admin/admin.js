module.exports = (req, res) => {
  try {
    res.redirect("/admin/posts");
  } catch (error) {
    throw new Error(error);
  }
};
