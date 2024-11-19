const express = require("express");
const {
  getPosts,
  createPostGet,
  createPostPost,
  ensureAuthenticated,
  deletePostPost,
} = require("../controllers/postController");

const postRouter = express.Router();

postRouter.get("/", ensureAuthenticated, getPosts);
postRouter.get("/create", ensureAuthenticated, createPostGet);
postRouter.post("/create", ensureAuthenticated, createPostPost);
postRouter.post("/:id/delete", ensureAuthenticated, deletePostPost);

module.exports = postRouter;
