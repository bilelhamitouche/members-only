const express = require("express");
const {
  getPosts,
  createPostGet,
  createPostPost,
} = require("../controllers/postController");

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/create", createPostGet);
postRouter.post("/create", createPostPost);

module.exports = postRouter;
