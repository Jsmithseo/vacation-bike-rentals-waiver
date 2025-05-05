// server.js
const express = require("express");
const cors = require("cors");
const waiverRoutes = require("./routes/send-waiver-email"); // Adjust if your path is different
require("dotenv").config();

const app = express();

// ✅ Middleware to prevent 413 errors
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// ✅ Use your router
app.use("/api", waiverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend server running on http://localhost:${PORT}`));
