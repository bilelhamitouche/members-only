function getHomepage(req, res) {
  res.render("index", { title: "Members only" });
}

module.exports = {
  getHomepage,
};
