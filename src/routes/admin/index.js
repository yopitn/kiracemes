const controller = require("../../controllers");
const express = require("express");
const middleware = require("../../middlewares");

const router = express.Router();

router.get("/", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.admin.index);

router.get("/setup", middleware.admin.isNotSetup, controller.admin.setup.index);
router.post("/setup", middleware.admin.isNotSetup, controller.admin.setup.create);

router.get("/signin", [middleware.admin.isSetup, middleware.admin.isNotLogin], controller.admin.signin.index);
router.post("/signin", [middleware.admin.isSetup, middleware.admin.isNotLogin], controller.admin.signin.create);

router.get("/signout", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.signout.destroy);

router.get("/posts", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.posts.index);
router.get("/post/new", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.posts.create);
router.get("/post/edit/:id", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.posts.update);

router.get("/pages", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.pages.index);
router.get("/page/new", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.pages.create);
router.get("/page/edit/:id", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.pages.update);

module.exports = router;
