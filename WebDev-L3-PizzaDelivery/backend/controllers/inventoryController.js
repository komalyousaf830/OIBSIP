const Inventory = require("../models/Inventory");

// Get all inventory items
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({
      category: 1,
      name: 1,
    });

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch inventory",
      error: error.message,
    });
  }
};

// Add new inventory item
const addInventoryItem = async (req, res) => {
  try {
    const { name, category, stock, threshold } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category are required",
      });
    }

    const existingItem = await Inventory.findOne({
      name: name.trim(),
    });

    if (existingItem) {
      return res.status(400).json({
        message: "Inventory item already exists",
      });
    }

    const item = await Inventory.create({
      name: name.trim(),
      category,
      stock: Number(stock) || 0,
      threshold: Number(threshold) || 20,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add inventory item",
      error: error.message,
    });
  }
};

// Update stock
const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock === undefined || Number(stock) < 0) {
      return res.status(400).json({
        message: "Valid stock value is required",
      });
    }

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        stock: Number(stock),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update stock",
      error: error.message,
    });
  }
};

// Update threshold
const updateThreshold = async (req, res) => {
  try {
    const { threshold } = req.body;

    if (
      threshold === undefined ||
      Number(threshold) < 0
    ) {
      return res.status(400).json({
        message: "Valid threshold is required",
      });
    }

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        threshold: Number(threshold),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update threshold",
      error: error.message,
    });
  }
};

// Delete inventory item
const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete inventory item",
      error: error.message,
    });
  }
};

module.exports = {
  getInventory,
  addInventoryItem,
  updateStock,
  updateThreshold,
  deleteInventoryItem,
};