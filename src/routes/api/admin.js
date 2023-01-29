const controller = require("../../controllers");
const express = require("express");
const middleware = require("../../middlewares");

const router = express.Router();

router.post("/session", controller.api.admin.session.create);

router.get("/posts", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.posts.findAll);
router.get("/posts/:id", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.posts.findById);
router.get("/posts/slug/:slug", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.posts.findBySlug);
router.post("/posts", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.posts.create);
router.put("/posts/:id", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.posts.update);
router.delete("/posts/:id", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.posts.destroy);

router.get("/pages", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.pages.findAll);
router.get("/pages/:id", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.pages.findById);
router.get("/pages/slug/:slug", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.pages.findBySlug);
router.post("/pages", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.pages.create);
router.put("/pages/:id", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.pages.update);
router.delete("/pages/:id", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.pages.destroy);

router.get("/tags/search", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.tags.search);

router.post("/images/upload", [middleware.admin.isSetup, middleware.api.authAPIAdmin], controller.api.admin.images.upload);

module.exports = router;
