const controller = require("../../controllers");
const express = require("express");
const middleware = require("../../middlewares");

const router = express.Router();

router.get("/", middleware.admin.isSetup, controller.blog.homepage);
router.get("/page/:page", middleware.admin.isSetup, controller.blog.pagination);
router.get("/category/:slug", middleware.admin.isSetup, controller.blog.category.main);
router.get("/category/:slug/page/:page", middleware.admin.isSetup, controller.blog.category.pagination);

module.exports = router;
