const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Pizza = require("./models/Pizza");

dotenv.config();

const updatePizzas = async () => {
  try {
    await connectDB();

    const pizzas = [
      {
        id: "6a8f093c5daccbee78312679",
        base: "Classic Thin Crust",
        sauce: "Classic Tomato",
        cheese: "Mozzarella",
        vegetables: ["Tomato", "Spinach"],
      },
      {
        id: "6a8f093c5daccbee7831267a",
        base: "Classic Thin Crust",
        sauce: "Spicy Marinara",
        cheese: "Mozzarella",
        vegetables: [],
      },
      {
        id: "6a8f093c5daccbee7831267b",
        base: "Classic Thick Crust",
        sauce: "Spicy Marinara",
        cheese: "Mozzarella",
        vegetables: ["Onion", "Capsicum"],
      },
      {
        id: "6a8f093c5daccbee7831267c",
        base: "Cheese Burst",
        sauce: "Classic Tomato",
        cheese: "Cheddar",
        vegetables: [],
      },
    ];

    for (const pizza of pizzas) {
      await Pizza.findByIdAndUpdate(
        pizza.id,
        {
          base: pizza.base,
          sauce: pizza.sauce,
          cheese: pizza.cheese,
          vegetables: pizza.vegetables,
        },
        { new: true }
      );
    }

    console.log("Pizza ingredients updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Pizza update error:", error);
    process.exit(1);
  }
};

updatePizzas();