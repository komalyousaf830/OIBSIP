const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Inventory = require("./models/Inventory");

dotenv.config();

const inventoryItems = [
  // Pizza Bases
  {
    name: "Classic Thin Crust",
    category: "base",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Classic Thick Crust",
    category: "base",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Cheese Burst",
    category: "base",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Whole Wheat",
    category: "base",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Gluten Free",
    category: "base",
    stock: 50,
    threshold: 20,
  },

  // Sauces
  {
    name: "Classic Tomato",
    category: "sauce",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Spicy Marinara",
    category: "sauce",
    stock: 50,
    threshold: 20,
  },
  {
    name: "BBQ Sauce",
    category: "sauce",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Garlic Sauce",
    category: "sauce",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Pesto Sauce",
    category: "sauce",
    stock: 50,
    threshold: 20,
  },

  // Cheeses
  {
    name: "Mozzarella",
    category: "cheese",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Cheddar",
    category: "cheese",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Parmesan",
    category: "cheese",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Cheese Blend",
    category: "cheese",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Vegan Cheese",
    category: "cheese",
    stock: 50,
    threshold: 20,
  },

  // Vegetables
  {
    name: "Onion",
    category: "vegetable",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Tomato",
    category: "vegetable",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Capsicum",
    category: "vegetable",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Mushroom",
    category: "vegetable",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Olives",
    category: "vegetable",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Jalapeno",
    category: "vegetable",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Corn",
    category: "vegetable",
    stock: 50,
    threshold: 20,
  },
  {
    name: "Spinach",
    category: "vegetable",
    stock: 50,
    threshold: 20,
  },
];

const seedInventory = async () => {
  try {
    await connectDB();

    await Inventory.deleteMany();

    await Inventory.insertMany(inventoryItems);

    console.log("Inventory seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Inventory seed error:", error);
    process.exit(1);
  }
};

seedInventory();