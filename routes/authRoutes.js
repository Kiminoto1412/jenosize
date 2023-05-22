const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

console.log(1212);

router.post("/register", authController.registerWithEmailAndPassword);
router.get("/login/google", authMiddleware, authController.loginWithGoogle);
router.post("/login/facebook", authController.loginWithFacebook);
router.post("/login", authController.loginWithEmailAndPassword);
router.post("/user/:uid", authController.checkAuthStatus);

module.exports = router;
