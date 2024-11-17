const db = require("../db/queries");

async function getPosts(req, res) {
  const posts = await db.getPosts();
  res.render("posts", { title: "Posts", posts: posts });
}

module.exports = {
  getPosts,
};
