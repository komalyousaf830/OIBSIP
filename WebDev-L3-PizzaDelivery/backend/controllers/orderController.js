
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");

// Create new order
const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      deliveryAddress,
      phone,
    } = req.body;

    // Check required fields
    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !deliveryAddress ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all order details",
      });
    }

    // Check every pizza and its inventory requirements
    for (const item of items) {
      const pizza = await Pizza.findById(item.pizza);

      if (!pizza) {
        return res.status(404).json({
          success: false,
          message: `Pizza not found: ${item.name}`,
        });
      }

      const quantity = Number(item.quantity);

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid pizza quantity",
        });
      }

      // Ingredients required for this pizza
      const ingredients = [
        {
          name: pizza.base,
          category: "base",
        },
        {
          name: pizza.sauce,
          category: "sauce",
        },
        {
          name: pizza.cheese,
          category: "cheese",
        },
      ];

      // Add vegetables
      if (Array.isArray(pizza.vegetables)) {
        pizza.vegetables.forEach((vegetable) => {
          ingredients.push({
            name: vegetable,
            category: "vegetable",
          });
        });
      }

      // Check stock before changing anything
      for (const ingredient of ingredients) {
        if (!ingredient.name) {
          continue;
        }

        const inventoryItem = await Inventory.findOne({
          name: ingredient.name,
          category: ingredient.category,
        });

        if (!inventoryItem) {
          return res.status(400).json({
            success: false,
            message: `Inventory item not found: ${ingredient.name}`,
          });
        }

        const requiredStock = quantity;

        if (inventoryItem.stock < requiredStock) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${ingredient.name}`,
          });
        }
      }
    }

    // Decrease inventory after all stock checks pass
    for (const item of items) {
      const pizza = await Pizza.findById(item.pizza);

      const quantity = Number(item.quantity);

      const ingredients = [
        {
          name: pizza.base,
          category: "base",
        },
        {
          name: pizza.sauce,
          category: "sauce",
        },
        {
          name: pizza.cheese,
          category: "cheese",
        },
      ];

      if (Array.isArray(pizza.vegetables)) {
        pizza.vegetables.forEach((vegetable) => {
          ingredients.push({
            name: vegetable,
            category: "vegetable",
          });
        });
      }

      for (const ingredient of ingredients) {
        if (!ingredient.name) {
          continue;
        }

        await Inventory.findOneAndUpdate(
          {
            name: ingredient.name,
            category: ingredient.category,
          },
          {
            $inc: {
              stock: -quantity,
            },
          }
        );
      }
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      deliveryAddress,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.pizza")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .populate("items.pizza")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", "name email phone")
      .populate("items.pizza");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};

