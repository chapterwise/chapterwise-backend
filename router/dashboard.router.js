const express = require("express");
const router = express.Router();

const verifyToken = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/role.middleware');

const dashBoardController = require("../controller/dashboard.controller")

router.get("/dashboard/login", dashBoardController.renderLoginPage);
// router.get("/dashboard/signup", );

module.exports = router;