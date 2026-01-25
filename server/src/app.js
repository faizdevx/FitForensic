import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import { requireAuth } from "./middleware/requireAuth.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/me", requireAuth, (req, res) => {
  res.json({ userId: req.userId });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/test-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Test",
      email: "test@test.com",
      passwordHash: "hash",
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
  }
};



startServer();
