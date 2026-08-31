const Pizza = require("../models/Pizza");

// Get all pizzas
const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ available: true });

    res.status(200).json({
      success: true,
      pizzas,
    });
  } catch (error) {
    console.error("Get Pizzas Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get single pizza
const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      success: true,
      pizza,
    });
  } catch (error) {
    console.error("Get Pizza Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getPizzas,
  getPizzaById,
};