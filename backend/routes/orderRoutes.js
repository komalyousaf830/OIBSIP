const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create new order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my-orders", protect, getMyOrders);

// Get all orders for admin
router.get("/all", protect, getAllOrders);

module.exports = router;