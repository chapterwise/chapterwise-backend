const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller");
const verifyToken = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/role.middleware");

// Place an order (creates order, calculates bill, updates popularity, clears cart)
router.post("/order", verifyToken, orderController.createOrder);

// Get all orders (for admin use)
router.get("/orders", [verifyToken, isAdmin], orderController.getAllOrders);

// Get a single order by ID
router.get("/order/:id", verifyToken, orderController.getOneOrder);

// Update an order by ID (e.g., update status)
router.patch("/order/:id", [verifyToken, isAdmin], orderController.updateOrder);

// Delete an order by ID (for admin use)
router.delete("/order/:id", [verifyToken, isAdmin], orderController.deleteOrder);

module.exports = router;
