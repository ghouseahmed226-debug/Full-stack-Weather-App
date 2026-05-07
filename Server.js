require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const weatherRoutes = require("./routes/weather");
const recordRoutes = require("./routes/records");
const exportRoutes = require("./routes/export");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/export", exportRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Weather App API is running",
    timestamp: new Date().toISOString(),
    author: "AI Engineer Intern Candidate",
    company: "PM Accelerator",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/weatherapp"
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("⚠️  Running without database - some features will be unavailable");
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌤️  Weather App Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

module.exports = app;
