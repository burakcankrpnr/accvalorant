const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");

const mainRoute = require("./routes/index.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Bağlantısı
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// ✅ Middleware'ler
app.use(logger("dev"));
app.use(express.json());
app.use(cors({ origin: "*" })); // 🔹 Tüm domainlerden gelen istekleri kabul eder.

// ✅ API Route'ları
app.use("/api", mainRoute);

// ✅ Sunucu Dinleme
app.listen(PORT, "0.0.0.0", async () => {
  await connectDB(); // 🔹 Sunucu başladığında MongoDB'ye bağlanır.
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
