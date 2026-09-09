const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await Admin.create({
      name: "Pizza Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully!");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");

    process.exit();
  } catch (error) {
    console.error("Admin Creation Error:", error.message);
    process.exit(1);
  }
};

createAdmin();