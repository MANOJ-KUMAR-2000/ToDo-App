const express = require("express");
const dashboardController = require("../controllers/dashboardControllers");
const router = express.Router();


router.get("/logout", dashboardController.logout)

router.get("/dashboard", dashboardController.main)
router.post("/createActivity", dashboardController.createActivity)


module.exports = router;