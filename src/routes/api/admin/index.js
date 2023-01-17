const controller = require("../../../controllers");
const express = require("express");
const middleware = require("../../../middlewares");

const router = express.Router();

router.post("/session", controller.api.session.create);

router.get("/posts", middleware.api.authAPIAdmin, controller.api.posts.findAll);
router.get("/posts/:id", middleware.api.authAPIAdmin, controller.api.posts.findById);
router.post("/posts", middleware.api.authAPIAdmin, controller.api.posts.create);
router.put("/posts/:id", middleware.api.authAPIAdmin, controller.api.posts.update);

module.exports = router;
