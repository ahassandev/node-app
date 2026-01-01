const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

dotenv.config();

const app = express();

// ---- FIXED + PERFECT CORS SETTINGS ----
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true,               // important for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(express.json());
app.use(cookieParser());

// Connect MongoDB
connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
