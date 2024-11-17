const express = require("express");

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Members only" });
});

module.exports = indexRouter;
