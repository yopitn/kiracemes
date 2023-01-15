const controller = require("../../controllers");
const express = require("express");

const router = express.Router();

router.get("/", controller.admin.admin);
router.get("/setup", controller.admin.setup.index);
router.post("/setup", controller.admin.setup.create);

module.exports = router;
