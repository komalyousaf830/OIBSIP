const express = require("express");

const {
  getPizzas,
  getPizzaById,
} = require("../controllers/pizzaController");

const router = express.Router();

// Get all pizzas
router.get("/", getPizzas);

// Get one pizza by ID
router.get("/:id", getPizzaById);

module.exports = router;