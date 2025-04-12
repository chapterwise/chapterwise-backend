const express = require('express')
const path = require('path')
const router = express.Router()

const userController = require("../controller/user.controller");
const verifyToken = require('../middleware/auth.middleware');

router.post("/signup", userController.userSignUpController);
router.post("/login", userController.userSignInController);
router.get("/profile", verifyToken, userController.userProfileController);
router.patch("/profile", verifyToken, userController.userUpdateProfileController);

module.exports = router;