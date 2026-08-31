const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Pizza Delivery Backend is Running!");
});

// Auth routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// Admin routes
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

// User routes
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

// Pizza routes
const pizzaRoutes = require("./routes/pizzaRoutes");

app.use("/api/pizzas", pizzaRoutes);

// Order routes
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})