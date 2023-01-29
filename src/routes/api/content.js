const controller = require("../../controllers");
const express = require("express");
const middleware = require("../../middlewares");

const router = express.Router();

router.get("/posts", middleware.admin.isSetup, controller.api.content.posts.findAll);
router.get("/posts/:id", middleware.admin.isSetup, controller.api.content.posts.findById);
router.get("/posts/slug/:slug", middleware.admin.isSetup, controller.api.content.posts.findBySlug);

router.get("/pages", middleware.admin.isSetup, controller.api.content.pages.findAll);
router.get("/pages/:id", middleware.admin.isSetup, controller.api.content.pages.findById);
router.get("/pages/slug/:slug", middleware.admin.isSetup, controller.api.content.pages.findBySlug);

module.exports = router;
