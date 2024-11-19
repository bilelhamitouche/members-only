const db = require("../db/queries");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

async function getPosts(req, res) {
  const posts = await db.getPosts();
  res.render("posts", {
    title: "Posts",
    posts: posts,
    isMember: req.user.member,
    isAdmin: req.user.admin,
  });
}

async function createPostGet(req, res) {
  res.render("createPost", {
    title: "Create post",
    user: req.user,
    isMember: req.user.member,
    isAdmin: req.user.admin,
  });
}

async function createPostPost(req, res) {
  const user = req.user;
  const { title, text } = req.body;
  await db.insertPost(title, text, user.id);
  res.redirect("/posts");
}

async function deletePostPost(req, res) {
  const postId = req.params.id;
  await db.deletePost(postId);
  res.redirect("/posts");
}

module.exports = {
  ensureAuthenticated,
  getPosts,
  createPostGet,
  createPostPost,
  deletePostPost,
};
