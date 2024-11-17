const express = require("express");
const { getHomepage } = require("../controllers/indexController");

const indexRouter = express.Router();

indexRouter.get("/", getHomepage);

module.exports = indexRouter;
