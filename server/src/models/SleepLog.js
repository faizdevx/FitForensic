import mongoose from "mongoose";

const SleepLogSchema = new mongoose.Schema({
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

  sleepHours: {
    type: Number,
    required: true,
    min: 0,
    max: 24
  },

  sleepQuality: {
    type: Number,
    min: 1,
    max: 5
  }

}, { timestamps: true });

SleepLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("SleepLog", SleepLogSchema);
