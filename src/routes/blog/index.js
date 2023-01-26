const controller = require("../../controllers");
const express = require("express");
const middleware = require("../../middlewares");

const router = express.Router();

router.get("/", middleware.admin.isSetup, controller.blog.homepage);

module.exports = router;
