const express = require("express");

const router = express.Router();

router.logout("/logout", dashboardController.logout)
router.get("/dashboard", dashboardController.main)

module.exports = router;