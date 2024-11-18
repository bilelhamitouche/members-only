const db = require("../db/queries");

async function getPosts(req, res) {
  const posts = await db.getPosts();
  res.render("posts", { title: "Posts", posts: posts });
}

async function createPostGet(req, res) {
  res.render("createPost", { title: "Create post", user: req.user });
}

async function createPostPost(req, res) {
  const user = req.user;
  const { title, text } = req.body;
  await db.insertPost(title, text, user.id);
  res.redirect("/posts");
}

module.exports = {
  getPosts,
  createPostGet,
  createPostPost,
};
