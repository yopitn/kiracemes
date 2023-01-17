exports.index = (req, res) => {
  try {
    res.render("admin/editor");
  } catch (error) {
    throw new Error(error);
  }
};
