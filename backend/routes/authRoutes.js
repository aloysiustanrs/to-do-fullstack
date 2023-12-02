const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// starting from /auth endpoint

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
