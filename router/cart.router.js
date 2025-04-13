const express = require("express");
const router = express.Router();

const cartController = require("../controller/cart.controller");
const verifyToken = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/role.middleware');

router.post("/add", [verifyToken], cartController.addToCart);
router.patch("/:lineId", [verifyToken], cartController.removeFromCart);
router.get("/", [verifyToken], cartController.getUserCart);

module.exports = router;
