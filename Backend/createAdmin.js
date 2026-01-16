require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("❌ Admin already exists");
      process.exit();
    }

    
    const hashedPassword = await bcrypt.hash("admin123", 10);

    
    const admin = new User({
      name: "Ahmad",
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("✅ Admin created successfully");
    process.exit();

  } catch (error) {
    console.error("Error:", error);
    process.exit();
  }
};

createAdmin();
