const express = require("express");
const {
  getPosts,
  createPostGet,
  createPostPost,
  ensureAuthenticated,
} = require("../controllers/postController");

const postRouter = express.Router();

postRouter.get("/", ensureAuthenticated, getPosts);
postRouter.get("/create", ensureAuthenticated, createPostGet);
postRouter.post("/create", ensureAuthenticated, createPostPost);

module.exports = postRouter;
