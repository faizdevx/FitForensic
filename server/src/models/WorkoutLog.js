import mongoose from "mongoose";

const SetSchema = new mongoose.Schema({
  reps: {
    type: Number,
    required: true,
    min: 1
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const WorkoutLogSchema = new mongoose.Schema({
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

  exercise: {
    type: String,
    required: true,
    trim: true
  },

  muscleGroup: {
    type: String,
    required: true,
    enum: [
      "chest",
      "back",
      "legs",
      "shoulders",
      "arms",
      "core"
    ],
    index: true
  },

  sets: {
    type: [SetSchema],
    validate: v => v.length > 0
  }

}, { timestamps: true });

WorkoutLogSchema.index({ userId: 1, date: 1 });

export default mongoose.model("WorkoutLog", WorkoutLogSchema);
