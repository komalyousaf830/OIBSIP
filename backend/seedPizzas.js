const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Pizza = require("./models/Pizza");

dotenv.config();

const pizzas = [
  {
    name: "Margherita Pizza",
    description: "Classic pizza with fresh tomato, mozzarella and basil.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000&auto=format&fit=crop",
    category: "Classic",
    available: true,
  },
  {
    name: "Pepperoni Pizza",
    description: "Loaded with spicy pepperoni and melted mozzarella cheese.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop",
    category: "Meat",
    available: true,
  },
  {
    name: "Chicken Fajita Pizza",
    description:
      "Juicy chicken, peppers, onions and delicious fajita seasoning.",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
    category: "Chicken",
    available: true,
  },
  {
    name: "Cheese Lovers Pizza",
    description: "Extra cheesy pizza made for true cheese lovers.",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1000&auto=format&fit=crop",
    category: "Cheese",
    available: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Pizza.deleteMany();

    await Pizza.insertMany(pizzas);

    console.log("Pizzas added successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedDatabase();