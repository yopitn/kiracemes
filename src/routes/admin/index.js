const controller = require("../../controllers");
const express = require("express");
const middleware = require("../../middlewares");

const router = express.Router();

router.get("/", middleware.admin.isLogin, controller.admin.admin.index);

router.get("/setup", middleware.admin.isNotSetup, controller.admin.setup.index);
router.post("/setup", middleware.admin.isNotSetup, controller.admin.setup.create);

router.get("/signin", middleware.admin.isNotLogin, controller.admin.signin.index);
router.post("/signin", middleware.admin.isNotLogin, controller.admin.signin.create);

router.get("/signout", middleware.admin.isLogin, controller.admin.signout.destroy);

router.get("/posts", middleware.admin.isLogin, controller.admin.posts.index);

module.exports = router;
