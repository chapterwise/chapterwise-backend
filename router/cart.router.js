const express = require("express");
const router = express.Router();

const cartController = require("../controller/cart.controller");
const verifyToken = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/role.middleware');

// Optionally, you can add authentication or admin checks as needed

// Get all carts
router.get("/carts", verifyToken, isAdmin, cartController.getAllCarts);

// Get one cart by ID
router.get("/cart/:id", verifyToken, cartController.getOneCart);

// Create a new cart
router.post("/cart", verifyToken, cartController.createCart);

// Update a cart by ID
router.patch("/cart/:id", verifyToken, cartController.updateCart);

// Delete a cart by ID
router.delete("/cart/:id", verifyToken, cartController.deleteCart);

module.exports = router;
