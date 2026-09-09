const express = require("express");

const {
  getPizzas,
  getPizzaById,
  addPizza,
} = require("../controllers/pizzaController");

const router = express.Router();

router.get("/", getPizzas);
router.get("/:id", getPizzaById);
router.post("/", addPizza);

module.exports = router;