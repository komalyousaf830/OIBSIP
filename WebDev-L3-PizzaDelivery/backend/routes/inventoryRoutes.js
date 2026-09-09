const express = require("express");

const router = express.Router();

const {
  getInventory,
  addInventoryItem,
  updateStock,
  updateThreshold,
  deleteInventoryItem,
} = require("../controllers/inventoryController");

const protect = require("../middleware/authMiddleware");

// Get all inventory
router.get("/", protect, getInventory);

// Add inventory item
router.post("/", protect, addInventoryItem);

// Update stock
router.put("/:id/stock", protect, updateStock);

// Update threshold
router.put("/:id/threshold", protect, updateThreshold);

// Delete inventory item
router.delete("/:id", protect, deleteInventoryItem);

module.exports = router;