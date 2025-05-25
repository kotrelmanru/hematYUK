// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// 1️⃣ CORS middleware first
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true,  // uncomment if you need to send cookies/auth
  })
);

// 2️⃣ Explicitly handle preflight requests
app.options("*", cors());

// 3️⃣ (Optional) Fallback manual CORS headers if you still see problems
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL || "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   // res.setHeader("Access-Control-Allow-Credentials", "true");
//   if (req.method === "OPTIONS") return res.sendStatus(204);
//   next();
// });

app.use(express.json());

// 4️⃣ Connect to MongoDB (or whatever your DB is)
connectDB();

// 5️⃣ Route handlers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// 6️⃣ Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
