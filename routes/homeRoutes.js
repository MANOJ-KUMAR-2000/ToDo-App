const express = require("express");
const homeController = require("../controllers/homeControllers.js");

const router = express.Router();

router.get("/", homeController.home)

router.get("/login", homeController.login_get)

router.post("/login", homeController.login_post)

router.get("/signup", homeController.signup_get)

router.post("/signup", homeController.signup_post)

router.get("/feedback", homeController.feedback_get)
router.post("/feedback", homeController.feedback_post)

module.exports = router;