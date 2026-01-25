import mongoose from "mongoose";

const DietLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  date: {
    type: String, // YYYY-MM-DD
    required: true,
    index: true
  },

  proteinGrams: {
    type: Number,
    required: true,
    min: 0
  },

  calories: Number,
  carbs: Number,
  fats: Number

}, { timestamps: true });

DietLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("DietLog", DietLogSchema);
