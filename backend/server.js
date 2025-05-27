// server.js
require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");
const connectDB = require("./config/db");
const authRoutes     = require("./routes/authRoutes");
const incomeRoutes   = require("./routes/incomeRoutes");
const expenseRoutes  = require("./routes/expenseRoutes");
const dashboardRoutes= require("./routes/dashboardRoutes");

const app = express();

const corsOptions = {
  origin:      process.env.CLIENT_URL,           // e.g. https://app.example.com
  methods:     ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true                              // if you ever send cookies/auth
};

// 1) CORS middleware
app.use(cors(corsOptions));

// 2) ALSO explicitly respond to OPTIONS pre-flight
app.options("*", cors(corsOptions));

// 3) Body parser
app.use(express.json());

// 4) DB + API routes
connectDB();
app.use("/api/v1/auth",      authRoutes);
app.use("/api/v1/income",    incomeRoutes);
app.use("/api/v1/expense",   expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// 5) Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
