import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  age: Number,
  heightCm: Number,
  weightKg: Number,

  trainingLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
  },

  goal: {
    type: String,
    enum: ["cut", "bulk", "recomp"],
    default: "recomp"
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
