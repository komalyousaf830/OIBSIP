const Pizza = require("../models/Pizza");

// Add new pizza
const addPizza = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      base,
      sauce,
      cheese,
      vegetables,
      available,
    } = req.body;

    if (!name || !description || !price || !image || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const pizza = await Pizza.create({
      name,
      description,
      price,
      image,
      category,
      base: base || "",
      sauce: sauce || "",
      cheese: cheese || "",
      vegetables: Array.isArray(vegetables) ? vegetables : [],
      available: available !== undefined ? available : true,
    });

    res.status(201).json({
      success: true,
      message: "Pizza added successfully",
      pizza,
    });
  } catch (error) {
    console.error("Add Pizza Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

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

// Update pizza ingredients
const updatePizzaIngredients = async (req, res) => {
  try {
    const {
      base,
      sauce,
      cheese,
      vegetables,
    } = req.body;

    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      {
        base: base || "",
        sauce: sauce || "",
        cheese: cheese || "",
        vegetables: Array.isArray(vegetables)
          ? vegetables
          : [],
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pizza ingredients updated successfully",
      pizza,
    });
  } catch (error) {
    console.error(
      "Update Pizza Ingredients Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getPizzas,
  getPizzaById,
  addPizza,
  updatePizzaIngredients,
};