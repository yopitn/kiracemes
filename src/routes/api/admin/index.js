const controller = require("../../../controllers");
const express = require("express");
const middleware = require("../../../middlewares");

const router = express.Router();

router.post("/session", controller.api.session.create);

router.get("/posts", middleware.api.authAPIAdmin, controller.api.posts.findAll);
router.get("/posts/:id", middleware.api.authAPIAdmin, controller.api.posts.findById);
router.get("/posts/slug/:slug", middleware.api.authAPIAdmin, controller.api.posts.findBySlug);
router.post("/posts", middleware.api.authAPIAdmin, controller.api.posts.create);
router.put("/posts/:id", middleware.api.authAPIAdmin, controller.api.posts.update);
router.delete("/posts/:id", middleware.api.authAPIAdmin, controller.api.posts.destroy);

router.get("/pages", middleware.api.authAPIAdmin, controller.api.pages.findAll);
router.get("/pages/:id", middleware.api.authAPIAdmin, controller.api.pages.findById);
router.get("/pages/slug/:slug", middleware.api.authAPIAdmin, controller.api.pages.findBySlug);
router.post("/pages", middleware.api.authAPIAdmin, controller.api.pages.create);
router.put("/pages/:id", middleware.api.authAPIAdmin, controller.api.pages.update);
router.delete("/pages/:id", middleware.api.authAPIAdmin, controller.api.pages.destroy);

router.post("/images/upload", middleware.api.authAPIAdmin, controller.api.images.upload);

module.exports = router;
