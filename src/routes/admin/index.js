const controller = require("../../controllers");
const express = require("express");

const router = express.Router();

router.get("/", controller.admin.admin.index);

router.get("/setup", controller.admin.setup.index);
router.post("/setup", controller.admin.setup.create);

router.get("/signin", controller.admin.signin.index);
router.post("/signin", controller.admin.signin.create);

router.get("/signout", controller.admin.signout.destroy);

module.exports = router;