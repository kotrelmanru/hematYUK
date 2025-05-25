// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const favicon = require("serve-favicon");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ─── 0️⃣ URL NORMALIZATION ─────────────────────────────────────────────────────────
// Strip any trailing commas or semicolons from the requested path so Express
// doesn’t try to interpret "/favicon.ico," (or "/,") as a broken route pattern.
app.use((req, res, next) => {
  // If you need other punctuation, add to the character class.
  req.url = req.url.replace(/[\.,;]+$/, "");
  next();
});

// ─── 1️⃣ CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true, // if you ever need cookies/auth
  })
);
app.options("*", cors()); // explicit preflight

// ─── 2️⃣ FAVICON & STATIC FILES ────────────────────────────────────────────────────
// Make sure you have `public/favicon.png` and any other assets in `public/`:
app.use(favicon(path.join(__dirname, "public", "favicon.png")));
app.use(express.static(path.join(__dirname, "public")));

// ─── 3️⃣ BODY PARSER ───────────────────────────────────────────────────────────────
app.use(express.json());

// ─── 4️⃣ DATABASE ─────────────────────────────────────────────────────────────────
connectDB();

// ─── 5️⃣ API ROUTES ───────────────────────────────────────────────────────────────
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// ─── 6️⃣ FALLBACK FOR UNHANDLED ROUTES ────────────────────────────────────────────
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── 7️⃣ START SERVER ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
