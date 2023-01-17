const controller = require("../../../controllers");
const express = require("express");
const middleware = require("../../../middlewares");

const router = express.Router();

router.post("/session", controller.api.session.create);

router.get("/posts", middleware.api.authAPIAdmin, controller.api.posts.findAll);
router.post("/posts", middleware.api.authAPIAdmin, controller.api.posts.create);

module.exports = router;
