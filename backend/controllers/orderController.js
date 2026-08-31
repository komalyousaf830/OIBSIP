const Order = require("../models/Order");

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


module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
};