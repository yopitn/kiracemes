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

router.get("/profile", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.profile.index);
router.put("/profile", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.profile.update);
router.put("/profile/image", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.profile.updateImage);
router.put("/profile/password", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.profile.updatePassword);

router.get("/setting", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.setting.index);
router.put("/setting", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.setting.update);
router.get("/setting/favicon", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.setting.getFavicon);
router.put("/setting/favicon", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.setting.updateFavicon);
router.get("/setting/robots-txt", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.setting.getRobotsTxt);
router.put("/setting/robots-txt", [middleware.admin.isSetup, middleware.admin.isLogin], controller.admin.setting.updateRobotsTxt);

module.exports = router;
